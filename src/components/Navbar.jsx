import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";

// bootstrap navbar component
const Navbar = () => {
  // state for bg color
  const [navBgColor, setNavBgColor] = useState("");

  const listenScrollEvent = () => {
    window.scrollY > 80
      ? setNavBgColor("#292b2c")
      : setNavBgColor("transparent");
  };

  // will run on componentDidMount & add a scroll event to change bg color of navbar.
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    // navbar with navLinks & setting bgColor with fade transition.
    <nav
      className="navbar navbar-expand-md navbar-dark fixed-top"
      style={{
        backgroundColor: navBgColor,
        transition: "background-color 1s ease",
      }}
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Coding Film <GiFilmSpool />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tv" className="nav-link">
                TV
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
