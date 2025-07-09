import { FaRegUserCircle, FaRegSun, FaRegMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { selectId, saveId } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import "../globals.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // returns auth id to default value, removing "authentication" from user
  const handleLogout = () => {
    dispatch(saveId(-1));
    navigate("/");
  };

  // default value for id is -1, persistence is now guarenteed across the board
  // one issue is scrolling up and down on the window makes multiple calls (scrolling most likely causes refreshing)
  function NavToPath(href) {
    const userId = useSelector((state) => selectId(state));
    if (userId !== -1) {
      console.log("Authenticated"); // Debug
      return href;
    } else if (userId === -1) {
      console.log("Not Authenticated"); // Debug
      return "/login";
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
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}
