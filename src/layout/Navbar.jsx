import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <p>EZSplit</p>
      </NavLink>
      <nav>
        {/* Navigation items can be added here if needed */}
      </nav>
    </header>
  );
}
