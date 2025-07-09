import { useState, useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css'
import './CodeEditor.css'

const CodeEditor = () => {
  const [code, setCode] = useState('# Write your Python code below \n\nprint("Hello, World!")')
  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code])

  return (
    <div className="code-editor-container">
      <div className="editor-wrapper">
        <pre className="code-highlight">
          <code ref={codeRef} className="language-python">
            {code}
          </code>
        </pre>
        <textarea
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>
    </div>
  )
}

export default CodeEditor
