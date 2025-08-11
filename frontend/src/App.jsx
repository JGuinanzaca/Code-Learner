import "./globals.css";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-section" style={{ minHeight: '95vh'}}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ margin: '0 0 1rem 0'}}>
            <span className="titlee">
              {"// code learner"}
            </span>
          </h1>
          <h3 className="hero-subtitle">Learn, practice, and master writing code</h3>
          <p className="hero-description">
            A free and beginner-friendly platform to help you learn, practice, and master the art of programming.
          </p>
          <button className="hero-btn" onClick={() => (window.location.href = "/login")}>
            Get Started
          </button>
        </div>
      </section>

      {/* Why code learner? */}
      <section className="features-section" style={{ boxShadow: '0 0 30px 40px var(--accent)', zIndex: 200}}>
        <h1 className="feature-title" style={{fontSize: '2rem'}}>What's unique about {" "}
          <span className="titlee" style={{fontSize: '2rem'}}>code learner</span>
          ?
        </h1> 
        <section className="features-grid">
          <div className="feature-card">
            <h2 className="feature-title">Interactive Lessons</h2>
            <p>Learn how to code with real-time feedback, straight from your browser. If you ever get stuck, you can always check-in with our forums.</p>
          </div>
          <div className="feature-card">
            <h2 className="feature-title">Project-Based Learning</h2>
            <p>Our learning process will teach you important coding concepts through practice problems that will hone your code problem solving skills. </p>
          </div>
          <div className="feature-card">
            <h2 className="feature-title">Beginner Friendly</h2>
            <p>Everyone starts as a beginner! We want to make this learning process easy for anyone and everyone. Come build a programmer mindset with us!</p>
          </div>
          <div className="feature-card">
            <h2 className="feature-title">Human Engineered</h2>
            <p>In an age of anti-intellectualism, it's important to stand up for education. Leave behind the AI and come strengthen your brain muscles with us! </p>
          </div>
          <div className="feature-card">
            <h2 className="feature-title">Totally Free</h2>
            <p>Education is a fundamental part of a progressive and innovative society, and we just want to teach what we know best! This is our gift, from one programmer to another.</p>
          </div>
          <div className="feature-card">
            <h2 className="feature-title">Build Community</h2>
            <p>The One Piece isn't the friends we made along the way, but that's a message we can get behind. Join our community of learners and teachers. Help each other and grow together.
            </p>
          </div>
        </section>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{ zIndex: -2}}>
        <div>
          <h2 className="hero-title">Ready to start your coding journey?</h2>
          <button className="hero-btn" onClick={() => (window.location.href = "/signup")}>
            Sign-up today!
          </button>
          <h4 className="cta-note">
            <br />
            {"( "}It's totally free! :{"3 )"}
          </h4>
        </div>
      </section>
    </div>
  );
}
