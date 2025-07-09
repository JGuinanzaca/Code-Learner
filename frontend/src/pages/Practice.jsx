import { useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
import { fetchLessons } from "../Api";
import "../globals.css";


export default function Code() {
  const [lessons, setLessons] = useState({ title: "", content: "" });
  const [Id, setId] = useState(1);
  const [code, setCode] = useState();

  async function handleBack() {
    try {
      if (Id === 1) {
        setId(3);
        await fetchLessons(Id).then((response) => {
          console.log(response[0]); // Debug purposes
          setLessons(response[0]);
        });
      } else {
        setId(Id - 1);
        await fetchLessons(Id).then((response) => {
          console.log(response[0]);
          setLessons(response[0]);
        });
      }
    } catch (error) {
      console.log("Fetching lessons failed:", error);
    }
  }

  async function handleNext() {
    try {
      if (Id === 3) {
        setId(1);
        await fetchLessons(Id).then((response) => {
          console.log(response[0]); //Debug purposes
          setLessons(response[0]);
        });
      } else {
        setId(Id + 1);
        await fetchLessons(Id).then((response) => {
          console.log(response[0]);
          setLessons(response[0]);
        });
      }
    } catch (error) {
      console.log("Fetching lessons failed:", error);
    }
  }

  return (
    <div className="custom-container">
      {/* Hero */}
      <section className="custom-hero">
        <div className="custom-hero-content">
          <h1 className="custom-title">// practice</h1>
        </div>

        <div className="custom-grid custom-code-grid">
          {["Python", "JavaScript", "C++"].map((lang, idx) => (
            <button
              key={idx}
              className="custom-button"
              onClick={() => alert(`${lang} loaded`)}>
              <h2 className="custom-button-heading">{lang}</h2>
            </button>
          ))}
        </div>
      </section>

      <main className="custom-main">
        <div className="custom-code-problem">
          <h2 className="custom-forum-title">{lessons.title}</h2>
          <p className="custom-forum-content">{lessons.content}</p>
          <div className="custom-pagination">
            <button onClick={handleBack}>back</button>
            <button onClick={handleNext}>next</button>
          </div>
        </div>

        {/* Code Editor */}
        <CodeEditor initialCode={code} onChange={setCode} />
      </main>
    </div>
  );
}
