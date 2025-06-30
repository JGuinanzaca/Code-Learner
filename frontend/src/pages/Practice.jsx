import "../globals.css";

export default function Code() {
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
              onClick={() => alert(`${lang} loaded, open editor`)}
            >
              <h2 className="custom-button-heading">{lang}</h2>
            </button>
          ))}
        </div>
      </section>

      <main className="custom-main">
        
        <div className="custom-code-problem">
          <h2 className="custom-forum-title">X. Code Problem Title</h2>
          <p className="custom-forum-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...
          </p>
          <div className="custom-pagination">
            <button>back</button>
            <button>next</button>
          </div>
        </div>

        {/* Code Block */}
        <div className="custom-code-block">
          <p>if this project is awesome, print “Yes!”</p>
          <pre>
{`if project.isAwesome == True:
    print("Yes!")
else:
    print("Yikes :/")`}
          </pre>
        </div>
      </main>
    </div>
  );
}
