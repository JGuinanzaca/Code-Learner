import React from "react";
import "../globals.css";

export default function Docs() {
  return (
    <div className="custom-container">
      {/* Hero */}
      <section className="custom-hero">
        <div className="custom-hero-content">
          <h1 className="custom-title">// read our docs</h1>
        </div>
        <div className="custom-grid custom-docs-grid">
          {["Python", "JavaScript", "C++"].map((text, idx) => (
            <button
              key={idx}
              className="custom-button"
              onClick={() => alert(`${text} loaded, open editor`)}
            >
              <h2 className="custom-button-heading">{text}</h2>
            </button>
          ))}
        </div>
        
      </section>

      <main className="custom-main">

        <aside className="custom-sidebar">
          <h2 className="custom-sidebar-title">Topics</h2>
          <ul className="custom-topic-list">
            {[
              "Variables & Data Types",
              "Control Flow",
              "Functions",
              "Loops",
              "Data Structures",
              "OOP",
              "Algorithms",
            ].map((topic, idx) => (
              <li key={idx}>
                <button className="custom-topic-button">{topic}</button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="custom-forum">
          <h2 className="custom-forum-title">Topic</h2>
          <p className="custom-forum-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>

          <div className="custom-code-block">
            <p className="mb-3">example code for topic:</p>
            <pre>
{`if project.isAwesome == True:
    print("Yes!")
else:
    print("Yikes :/")`}
            </pre>
          </div>

          <div className="custom-pagination">
            <button>back</button>
            <button>next</button>
          </div>
        </div>
      </main>
    </div>
  );
}
