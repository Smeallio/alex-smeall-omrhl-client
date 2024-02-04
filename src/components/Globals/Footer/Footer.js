import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__container">
        <Link className="footer__admin-link" to="/admin">
          Administrator Login
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
