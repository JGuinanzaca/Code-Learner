import { FaRegUserCircle, FaRegSun, FaRegMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectId } from "../redux/authSlice";
import "../globals.css";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "Practice", href: "/code" },
  { name: "Forums", href: "/forums" },
];

export default function Header({
  darkMode,
  toggleTheme,
  textEnter,
  textLeave,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // if the default id in the store is -1 (meaning user has not logged in or signed up), default path is /signup
  // otherwise, return the href stored in the map of navItems
  function NavToPath(href) {
    const id = useSelector((state) => selectId(state));
    if (id !== -1) {
      return href;
    } else {
      return "/signup";
    }
  }

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-inner">
          {/* nav bar */}
          <nav className="nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={NavToPath(item.href)}
                    className="nav-link"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* dark mode toggle */}
          <div className="header-actions">
            <button onClick={toggleTheme} aria-label="Toggle theme">
              {darkMode ? (
                <FaRegSun size={25} style={{ padding: 3 }} />
              ) : (
                <FaRegMoon size={25} style={{ padding: 3 }} />
              )}
            </button>
            <button onClick={() => (window.location.href = "/login")}>
              <FaRegUserCircle size={24} style={{ padding: 3 }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
