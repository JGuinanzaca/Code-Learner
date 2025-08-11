import { useState } from "react";

import lessons from "../resources/learningDocs.json";
import "../globals.css";

export default function Docs() {
  const [ lesson, setLesson ] = useState(lessons[0])
  const [ language, setLanguage ] = useState("python")

  const cssAppliedContent = body => `
    <div>
      <style>
        h6 {
          color: oklch(54.389% 0.1401 152.523);
          padding: 4%;
          background-color: var(--editor);
          width: 84%;
          margin: 0 auto;
          margin-top: 5%;
          margin-bottom: 5%;
          border-radius: 20px;
        }
        h5 {
          color: var(--accent-secondary);
          font-size: 1.3rem;
          font-weight: 400
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
      <section className="custom-hero">
        <div className="custom-hero-content">
          <h1 className="custom-title">// read our docs</h1>
        </div>
        <div className="custom-grid custom-docs-grid">
          {["Python", "JavaScript", "C++"].map((lang, idx) => (
            <button
              key={idx}
              className="custom-button"
              onClick={() => {
                const langMap = {
                  "Python": "python",
                  "JavaScript": "javascript",
                  "C++": "cpp"
                };
                const selLang = langMap[lang];
                setLanguage(selLang);
              }}>

              <h2 className="custom-button-heading">{lang}</h2>
            </button>
          ))}
        </div>
      </section>

      <main className="custom-main">
        <aside className="custom-sidebar">
          <h2 className="custom-sidebar-title">References: </h2>
          <ul className="custom-topic-list">
            {[
              "Functions I",
              "Variables & Data Types",
              "If Statements",
              "Loops",
              "Arrays",
              "Functions II",
              "Control Flow",
              "OOP",
              "Data Structures",
              "Algorithms",
            ].map((topic, idx) => (
              <li>
                <button  
                  key={idx}
                  className="custom-topic-button"
                  onClick={() => {
                    setLesson(lessons[idx])
                  }}>
                  <h2>{topic}</h2>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="main">
          <h2 className="main-title">{lesson.topic}</h2>
          <p className="main-content" dangerouslySetInnerHTML={{ __html: cssAppliedContent(lesson.basic + "<br><br>" + lesson.langu[language])}}></p>

          {/* <div className="custom-pagination">
            <button>back</button>
            <button>next</button>
          </div> */}
        </div>
      </main>
    </div>
  );
}
