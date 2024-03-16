import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__links">
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
      </ul>
    </nav>
  );
};

export default Nav;
