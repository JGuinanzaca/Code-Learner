import "../globals.css";

export default function Footer() {
    return (
        <section className="footer">
          <div className="footer-container">
            <div className="footer-content">
              {/* links */}
              <div className="footer-links">
                <a href="#" className="footer-link">Homepage</a>
                <a href="#" className="footer-link">FAQs</a>
                <a href="#" className="footer-link">Sitemap</a>
                <a href="#" className="footer-link">Contact</a>
              </div>
              {/* info */}
              <div className="footer-info">
                <span className="footer-team">Team 4 {"(I think??)"}</span>
                <span className="footer-meta">Hunter College IKTR</span>
                <span className="footer-meta">info@got2setthisup.com</span>
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