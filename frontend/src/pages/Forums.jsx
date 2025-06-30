export default function Forums() {
  return (
  <div className="custom-container">
    <section className="custom-hero">
      <div className="custom-hero-content">
        <h1 className="custom-title">// forums</h1>
      </div>

      <div className="custom-grid">
        {["Help", "Talk", "Python", "JavaScript", "C++"].map((text, idx) => (
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
          {Array.from({ length: 7 }).map((_, i) => (
            <li key={i}>
              <button className="custom-topic-button">...</button>
            </li>
          ))}
        </ul>
        <div className="custom-pagination">
          <button>back</button>
          <button>next</button>
        </div>
      </aside>

      <div className="custom-forum">
        <h2 className="custom-forum-title">X. Code Problem Title</h2>
        <p className="custom-forum-content">
          Lorem ipsum dolor sit amet...
        </p>
      </div>
    </main>
  </div>  
  );
}