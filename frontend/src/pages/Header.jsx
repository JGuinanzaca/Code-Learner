import { FaRegUserCircle, FaRegMoon } from "react-icons/fa";
import { ImSun } from "react-icons/im";
import { useState, useEffect } from "react";
import { selectId, saveId } from "../redux/authSlice";
import { useSelector } from "react-redux";
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
}) {
  const [scrolled, setScrolled] = useState(false);
  const userId = useSelector((state) => selectId(state));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   function handleScroll() {
  //     setScrolled(window.scrollY > 10);
  //   }
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   handleScroll(); // Set initial state
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);


  // default value for id is -1, persistence is now guarenteed across the board
  // one issue is scrolling up and down on the window makes multiple calls (scrolling most likely causes refreshing)
  function NavToPath(href) {
    if (href === "/") return href;
    if (userId !== -1) {
      console.log("Authenticated"); // Debug
      return href;
    } else if (userId === -1) {
      console.log("Not Authenticated"); // Debug
      return "/login";
    }
  }

  function ProfileOnClick(href) {
    if (userId !== -1) return "/profile";
    else if (userId === -1) return href;
  }

  function ProfileOnClick(href) {
    if (userId !== -1) return "/profile";
    else if (userId === -1) return href;
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
                <ImSun size={30} style={{ padding: 3 }} />
              ) : (
                <FaRegMoon size={30} style={{ padding: 3 }} />
              )}
            </button>
            <button onClick={() => (window.location.href = ProfileOnClick("/login"))}>
              <FaRegUserCircle size={30} style={{ padding: 3 }} />
            </button>
            {/* <button size={30} style={{ padding: 3 }} onClick={handleLogout}>logout</button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
