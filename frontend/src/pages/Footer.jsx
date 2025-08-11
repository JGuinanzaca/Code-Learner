import "../globals.css";

export default function Footer() {
    return (
        <section className="footer">
          <div className="footer-container">
            <div className="footer-content">
              {/* links */}
              <div className="footer-links">
                <a href="/" className="footer-link">Homepage</a>
                <a href="/sitemap" className="footer-link">Sitemap</a>
                <a href="mailto:learnercode771@gmail.com" className="footer-link">Contact</a>
              </div>
              {/* info */}
              <div className="footer-info">
                <span className="footer-team">Team 4</span>
                <span className="footer-meta">Hunter College</span>
                <span className="footer-meta">learnercode771@gmail.com</span>
              </div>
            </div>
            {/* copyright */}
            <div className="footer-copyright">
              <p>&copy; 2025 code learner. All rights reserved.</p>
            </div>
          </div>
        </section>
    );
}