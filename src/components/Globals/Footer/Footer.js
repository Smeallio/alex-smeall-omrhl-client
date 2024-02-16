import { Link } from "react-router-dom";
import facebookLogo from "../../../assets/images/icons/facebook_icon.png";
import instagramLogo from "../../../assets/images/icons/instagram_icon.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__container">
        <section className="footer__about">
          <h3 className="footer__header">About Us</h3>
          <p className="footer__text">
            Established in 2023, The Odd Man Rush Hockey League is a 3 on 3
            recreational hockey league located in St. John's, Newfoundland.
          </p>
        </section>
        <section className="footer__socials">
        <h3 className="footer__header">Follow Us</h3>
          <Link
            className="footer__socials-link"
            to="https://www.facebook.com/profile.php?id=61550747964046"
          >
            <img
              className="footer__socials-img"
              src={facebookLogo}
              alt="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Link>
          <Link
            className="footer__socials-link"
            to="https://www.instagram.com/odd.man.rush.hockey.league/"
          >
            <img
              className="footer__socials-img"
              src={instagramLogo}
              alt="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Link>
        </section>
      </section>
      <section className="footer__admin">
          <Link className="footer__admin-link" to="/admin">
            Administrator Login
          </Link>
        </section>
    </footer>
  );
};

export default Footer;
