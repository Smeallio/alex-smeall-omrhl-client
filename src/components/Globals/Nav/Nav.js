import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Nav.scss";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setMenuOpen(window.innerWidth >= 768);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setShowHamburger(!showHamburger);
  };

  return (
    <nav className="nav">
      {showHamburger && (
        <FontAwesomeIcon
          className="nav__toggle"
          icon={faBars}
          onClick={toggleMenu}
        />
      )}
      {menuOpen && (
        <>
        <FontAwesomeIcon
        className="nav__toggle-close"
        icon={faXmark}
        onClick={toggleMenu}
      />
        <ul className={`nav__links ${menuOpen ? "visible" : ""}`}>
          <li className="nav__links-text">
            <Link className="nav__links-link" to="/league-leaders">
              League Leaders
            </Link>
          </li>
          <li className="nav__links-text">
            <Link className="nav__links-link" to="/scores-and-schedule">
              Scores & Schedule
            </Link>
          </li>
          <li className="nav__links-text">
            <Link className="nav__links-link" to="/announcements">
              Announcements
            </Link>
          </li>
        </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
