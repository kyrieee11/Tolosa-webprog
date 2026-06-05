import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AT Clothes Logo"
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="text-lg font-bold text-zinc-900">AT Clothes</h1>
            <p className="text-xs text-zinc-500">Modern Fashion</p>
          </div>
        </div>

        <ul className="flex items-center gap-3">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to="/auth/signin"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Login
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/auth/signup"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;