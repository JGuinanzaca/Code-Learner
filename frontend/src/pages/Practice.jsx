import { useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
// import { fetchLessons } from "../Api";

import "../globals.css";
import problems from "../resources/practiceProblems.json";


export default function Code() {
  const [lesson, setLessons] = useState({ id: '1', title: "H", content: `type in: <pre className='custom-code-block'> print("Hello World") </pre> to code your first program.` });
  const [Id, setId] = useState(1);
  const [code, setCode] = useState();
  const [editorLanguage, setEditorLanguage] = useState("python");

  /* i think this works?? not sure */
  // useState(() => {
  //   fetchLessons().then(data => {
  //     setLessons(data[Id]);
  //   }).catch(err => {
  //     console.error("Failed to fetch lessons:", err);
  //   });
  // }, [Id]);

  function handleBack() {
    setId((prev) => (Id === 1 ? problems.length : prev - 1));
    setLessons({ 
      id: problems[Id-1].id, 
      title: problems[Id-1].title, 
      content: problems[Id-1].description,
      solution: problems[Id-1].solution 
    }); 
  }

  function handleNext() {
    setId((prev) => (Id === problems.length ? 1 : prev + 1));
    setLessons({ 
      id: problems[Id-1].id, 
      title: problems[Id-1].title, 
      content: problems[Id-1].description,
      solution: problems[Id-1].solution 
    });
  }

  return (
    <div className="custom-container">
      {/* Hero */}
      <section className="custom-hero">
        <div className="custom-hero-content">
          <h1 className="custom-title">{'//'} practice</h1>
        </div>

        <div className="custom-grid custom-code-grid">
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
                setCode(starterCode);
              }}>
              <h2 className="custom-button-heading">{lang}</h2>
            </button>
          ))}
        </div>
      </section>

      <main className="custom-main">
        <div className="custom-code-problem">
          <h2 className="main-title">{lesson.id + '. ' + lesson.title}</h2>
          <p className="main-content" dangerouslySetInnerHTML={{ __html: lesson.content }}></p>
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
          expectedOutput={ lesson.solution ? lesson.solution[editorLanguage].expectedOutput : "" }
        />
      </main>
    </div>
  );
}
