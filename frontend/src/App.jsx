import "./globals.css";

export default function HomePage() {
  return (
    <div className="homepage">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="titlee">
              {"// code learner"}
            </span>
          </h1>
          <h3 className="hero-subtitle">Learn, practice, and master writing code</h3>
          <p className="hero-description">
            A free and beginner-friendly platform to help you learn, practice, and master the art of programming.
          </p>
          <button className="hero-btn">
            Get Started
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="feature-card">
          <h2 className="feature-title">Interactive Lessons</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Project-Based Learning</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Beginner Friendly</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>
          <h2 className="cta-title">Ready to start your coding journey?</h2>
          <button className="cta-btn">
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
