import { useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
// import { fetchLessons } from "../Api";
import "../globals.css"
import "../CodeEditor.css";
import problems from "../resources/practiceProblems.json";


export default function Code() {
  const [Id, setId] = useState(1);
  const [lesson, setLessons] = useState(problems[0]);
  const [code, setCode] = useState();
  const [editorLanguage, setEditorLanguage] = useState("python");

  /* i think this works?? not sure, cant test :'| */
  // useState(() => {
  //   fetchLessons().then(data => {
  //     setLessons(data[Id]);
  //   }).catch(err => {
  //     console.error("Failed to fetch lessons:", err);
  //   });
  // }, [Id]);

  function handleBack() {
    setId(prevId => {
      const newId = prevId === 1 ? problems.length : prevId - 1;
      setLessons(problems[newId - 1]);
      return newId;
    }); 
  }

  function handleNext() {
    setId(prevId => {
      const newId = prevId === problems.length ? 1 : prevId + 1;
      setLessons(problems[newId - 1]);
      return newId;
    }); 
  }

  const cssAppliedContent = body => `
    <div>
      <style>


        h6 {
          color: #99d02cff;
          padding: 4%;
          background-color: #2d2d2d;
          width: 84%;
          margin: 0 auto;
          margin-top: 5%;
          margin-bottom: 5%;
          border-radius: 20px;

        }
        h5 {
          color: var(--text);
        }
        hr {
          margin: 3% 0;
        }
        .titlee {
          font-size: 1rem;
          letter-spacing: .2em;
          font-family: 'ClashDisplayVariable', sans-serif;
          color: var(--accent-secondary);
          text-shadow: var(--tshadow);
        }  
      </style>
      ${body}
    <div>
    `;

  return (
    <div className="custom-container">
      {/* Hero */}
      {/* <section className="custom-hero">
        <div className="custom-hero-content">
          <h1 className="custom-title">{'//'} practice</h1>
        </div>

        
      </section> */}

      <main className="code-main" style={{marginTop: '3%'}}>
        <div className="custom-code-problem">
          <div className="custom-grid custom-code-grid" style={{margin: '0', marginBottom: '5%'}}>
          {["Python", "JavaScript", "C++"].map((lang, idx) => (
            <button
              key={idx}
              className="custom-button"
              onClick={() => {
                const langMap = {
                  "Python": {lang: "python", code: '# Write your python code below\n\n'},
                  "JavaScript": { lang: "javascript", code: '// Write your JavaScript code below\n\n' },
                  "C++": { lang: "cpp", code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your C++ code below\n\n\n    return 0;\n}' }
                };

                const { lang: selectedLang, code: starterCode } = langMap[lang];
                setEditorLanguage(selectedLang);
                setLessons(problems[Id-1])
                setCode(starterCode);
              }}>
              <h2 className="custom-button-heading">{lang}</h2>
            </button>
          ))}
        </div>
          <h2 className="main-title">{lesson.id + '. '} {lesson.title}</h2>
          <p className="main-content" dangerouslySetInnerHTML={{ __html: cssAppliedContent(lesson.description.default + "<br>" + lesson.description[editorLanguage] + "<hr><h5>Here's your challenge:<br><br>" + lesson.description.challenge + "</h5>") }}></p>
          <div className="custom-pagination">
            <button onClick={handleBack}>back</button>
            <button onClick={handleNext}>next</button>
          </div>
        </div>

        {/* Code Editor */}
        <CodeEditor 
          initialCode={code} 
          onChange={setCode}
          language={editorLanguage}
          expectedOutput={ lesson.solution }
        />
      </main>
    </div>
  );
}
