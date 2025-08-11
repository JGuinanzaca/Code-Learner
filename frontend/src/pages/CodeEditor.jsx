import { useState, useEffect, useRef } from 'react'
import Prism from 'prismjs'

import 'prismjs/themes/prism-tomorrow.css';
import '../CodeEditor.css'
import { saveProgress } from '../Api'

function createRunnerWorkerURL() {
  const workerCode = `
  let pyodideReady = null;

  async function ensurePyodideLoaded() {
    if (!pyodideReady) {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
      pyodideReady = loadPyodide();
    }
    return pyodideReady;
  }

  async function runJS(source) {
    // Capture console.log output
    let logs = [];
    const originalLog = console.log;
    console.log = (...args) => { logs.push(args.join(' ')); };
    try {
      // Use Function constructor to catch syntax errors separately
      const fn = new Function(source);
      const result = fn();
      if (result !== undefined) logs.push(String(result));
      return { stdout: logs.join('\\n'), stderr: '' };
    } catch (e) {
      // SyntaxError, ReferenceError, etc. -> treat as "compilation" error
      return { stdout: '', stderr: e && e.stack ? e.stack : String(e), isCompileError: e instanceof SyntaxError };
    } finally {
      console.log = originalLog;
    }
  }

  async function runPy(source) {
    try {
      const pyodide = await ensurePyodideLoaded();

      // Redirect stdout/stderr to StringIO, then execute
      await pyodide.runPythonAsync(\`
import sys, io
_stdout, _stderr = io.StringIO(), io.StringIO()
sys.stdout, sys.stderr = _stdout, _stderr
\`);
      try {
        await pyodide.runPythonAsync(source);
      } catch (e) {
        // Py exceptions are "compile/runtime" errors
        return { stdout: '', stderr: String(e), isCompileError: /SyntaxError/.test(String(e)) };
      }
      const stdout = pyodide.runPython('_stdout.getvalue()');
      const stderr = pyodide.runPython('_stderr.getvalue()');
      return { stdout, stderr };
    } catch (e) {
      return { stdout: '', stderr: 'Pyodide load/exec error: ' + String(e) };
    }
  }

  async function run({ language, code }) {
    if (language === 'javascript' || language === 'js') {
      return runJS(code);
    } else if (language === 'python' || language === 'py') {
      return runPy(code);
    } else {
      return { stdout: '', stderr: 'Client-side execution for ' + language + ' is not supported.' };
    }
  }

  self.onmessage = async (evt) => {
    const { language, code } = evt.data;
    const result = await run({ language, code });
    postMessage({ type: 'result', ...result });
  };
  `;
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
}

// helper to test for timeout errors 
function runClientTests({ language, code, timeoutMs = 4000 }) {
  return new Promise((resolve) => {
    const workerURL = createRunnerWorkerURL();
    const worker = new Worker(workerURL);
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        worker.terminate();
        URL.revokeObjectURL(workerURL);
        resolve({ kind: 'timeout', stdout: '', stderr: 'Execution timed out.' });
      }
    }, timeoutMs);

    worker.onmessage = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(workerURL);
      const { stdout, stderr, isCompileError } = e.data || {};

      if (isCompileError) {
        resolve({ kind: 'compile_error', stdout, stderr });
      } else if (stderr && stderr.trim() !== '') {
        // js or python runtime error
        resolve({ kind: 'runtime_error', stdout, stderr });
      } else {
        resolve({ kind: 'ok', stdout, stderr: '' });
      }
    };

    worker.onerror = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(workerURL);
      resolve({ kind: 'compile_error', stdout: '', stderr: String(err.message || err) });
    };

    worker.postMessage({ language, code });
  });
}

export default function CodeEditor({ language = 'python', expectedOutput = 'hello world', initialCode = '# Write your python code below\n\n' }) {
  const [code, setCode] = useState(initialCode)
  const [activeTab, setActiveTab] = useState('editor')
  const [output, setOutput] = useState('')
  const codeRef = useRef(null)  
  const textAreaRef = useRef(null)
  const [rainbow, setRainbow] = useState(false)


  useEffect(() => {
    let isMounted = true;

    const loadLang = async () => {
    try {
      if (language === 'cpp') {
        await import('prismjs/components/prism-clike')
        await import('prismjs/components/prism-c')
        await import('prismjs/components/prism-cpp')
      } else {
        await import(`prismjs/components/prism-${language}`)
      }

      if (codeRef.current && isMounted) {
        Prism.highlightElement(codeRef.current);
      }
      // console.log(`Prism language loaded: ${language}`);

      } catch (err) {
        console.error(`Failed to load prism-${language}:`, err);
      };
    }
    loadLang();
    
    return () => {
      isMounted = false;
    };
  }, [code, activeTab, language]);

  useEffect(() => {
    if (initialCode !== undefined) {
      setCode(initialCode);
    }
  }, [initialCode]);

  // auto-resizing textarea
  const resizeTextarea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };
  useEffect(() => {
    resizeTextarea();
  }, [code, activeTab]);

  const handleScroll = () => {
    if (codeRef.current && textAreaRef.current) {
      codeRef.current.parentElement.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  const wrapAsMultilineString = (input) => {
    // avoid issues with backslashes and multiline strings 
    //const escaped = input.replace(/\\/g, '\\\\').replace(/'''/g, "\\'\\'\\'")
    return `'''${input}'''`
  }

  const formatOutcome = (result, expected) => {
    const expect = (expected ?? '').trimEnd();
    const got = (result.stdout ?? '').trimEnd();

    switch (result.kind) {
      case 'compile_error':
        return { 
          status: 'error', 
          message: `Compilation Error:\n${result.stderr}`, 
          output: ''
        };
      case 'timeout':
        return { 
          status: 'error', 
          message: `Timeout Error: Execution exceeded the time limit.` , 
          output: ''
        };
      case 'ok':
        if (got === expect) {
          return { 
            status: 'success', 
            message: `What a success!! You got it!`,
            output: `\n\nYour Output:\n${result.stdout}` 
          };
        } else {
          return { 
            status: 'mismatch', 
            message: "This code doesn't look quite right...\nBut don't give up! Try again!",
            output: `\n\nYour Output:\n${result.stdout}\n\nWhat we expected:\n${expect}\n\nYour Output:\n${result.stdout}` 
          };
        }
      case 'runtime_error':
        return { 
          status: 'error', 
          message: 'Runtime Error:',
          output: `\n${result.stderr}`
        };
      default:
        return { 
          status: 'error', 
          message: '`Unknown issue: ',
          output: `\n${JSON.stringify(result, null, 2)}`
        };
    }
  };

  const runAndReport = async () => {
    // save user prog 
    try {
      const mlString = { code: wrapAsMultilineString(code) };
      await saveProgress(mlString);
    } catch (err) {
      console.error('save failed:', err);
    }

    // update output tb
    setActiveTab('output');
    setOutput({status: '', message:'Running your code...', output: ''});

    const result = await runClientTests({
      language,
      code,
      timeoutMs: 5000,
    });

    // display actual output result 
    const { status, message} = formatOutcome(result, expectedOutput);
    setOutput({ status, message, output: result.stdout });

    // rainbow effect for a sucessful output! :3
    if (status === 'success') {
      setRainbow(true);
      setTimeout(() => setRainbow(false), 3000);
    }
    // ensure textarea does not resize after button click
    setTimeout(resizeTextarea, 0);
  };

  return (
    <div className="code-editor-container">
      <div className="tab-toggle">
        <button
          className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}>
          Editor
        </button>
        <button
          className={`tab-button ${activeTab === 'output' ? 'active' : ''}`}
          onClick={() => setActiveTab('output')}>
          Output
        </button>
      </div>

      {activeTab === 'editor' && (
        <div className="editor-wrapper">
          <pre className="code-editor">
            <code ref={codeRef} className={`language-${language}`} spellCheck={false}>
              {code}
            </code>

            <textarea
            ref={textAreaRef}
            className="code-input"
            value={code}
            onScroll={handleScroll}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            />
          </pre>
          <button onClick={runAndReport} className="send-button">
            Run Your Code
          </button>
        </div>
      )}

      {activeTab === 'output' && (
        <div className="output-wrapper">
          <pre className={`${output.status} ${rainbow ? 'rainbow' : ''}`} style={{ marginLeft: '1.2%'}}>
            {output.message}
          </pre>
          <pre className={'code-output'}>
            {output.output}
          </pre>
        </div>
      )}
    </div>
  );
}