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
              onClick={() => alert(`${text} docs loaded`)}
            >
              <h2 className="custom-button-heading">{text}</h2>
            </button>
          ))}
        </div>
        
      </section>

      <main className="custom-main">

        <aside className="custom-sidebar">
          <h2 className="custom-sidebar-title">References: </h2>
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
            This will be a description of the topic being covered in this section. Users can come back to see how certain concepts are implemented in different programming languages. This part of the website will virtually act as a textbook/reference/review page.
          </p>

          <div className="custom-code-block">
            <p>example code for topic:</p>
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
