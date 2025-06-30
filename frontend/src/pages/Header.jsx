import { FaRegUserCircle, FaRegSun, FaRegMoon } from "react-icons/fa";
import { useState, useEffect } from 'react'
import "../globals.css";


const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Docs', href: '/docs' },
  { name: 'Practice', href: '/code' },
  { name: 'Forums', href: '/forums' },
]

export default function Header({ darkMode, toggleTheme, textEnter, textLeave }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`header ${scrolled ? 'header-scrolled' : ''}`}
    >
      <div className="header-container">
        <div className="header-inner">
          {/* nav bar */}
          <nav className="nav">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
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
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FaRegSun size={25} style={{padding: 3}} />
              ) : (
                <FaRegMoon size={25} style={{padding: 3}} />
              )}
            </button>
            <button
              onClick={() => window.location.href = '/login'}
            >
              <FaRegUserCircle size={24} style={{padding: 3}} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}