import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__links">
        <Link className="nav__links-link" to="/league-leaders">
          <li className="nav__links-text">League Leaders</li>
        </Link>
        <Link className="nav__links-link" to="/scores-and-schedule">
          <li className="nav__link">Scores & Schedule</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
