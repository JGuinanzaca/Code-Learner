import { Link } from "react-router-dom";
import { selectId } from "../redux/authSlice";
import { useSelector } from "react-redux";

const sitemapLinks = [
  { path: "/", label: "Home" },
  { path: "/code", label: "Practice Coding" },
  { path: "/forums", label: "Forums" },
  { path: "/docs", label: "Read through code docs" },
  { path: "/login", label: "Login" },
  { path: "/signup", label: "Register" },
  { path: "/sitemap", label: "Sitemap" },
];

// default value for id is -1, persistence is now guarenteed across the board
// one issue is scrolling up and down on the window makes multiple calls (scrolling most likely causes refreshing)
function NavToPath(path) {
  const userId = useSelector((state) => selectId(state));
  if (path === "/") return path;
  if (userId !== -1) {
    console.log("Authenticated"); // Debug
    return path;
  } else if (userId === -1) {
    console.log("Not Authenticated"); // Debug
    return "/login";
  }
}

const Sitemap = () => (
  <div className="custom-container">
    <section className="custom-hero">
      <h1 className="custom-title">Sitemap</h1>
    </section>
    <div className="custom-main custom-grid">
      <ul>
        {sitemapLinks.map((link) => (
          <li key={link.path}>
            <Link to={NavToPath(link.path)}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Sitemap;
