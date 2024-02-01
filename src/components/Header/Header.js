import omrLogo from "../../assets/images/logos/OMRHL-logo-vector.png";
import ducksLogo from "../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../assets/images/logos/Moose-vector.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <section className="header__container">
        <section className="header__league-logo">
          <img
            className="header__league-logo-img"
            src={omrLogo}
            alt="Odd Man Rush Hockey League"
          />
        </section>
        <section className="header__team-logos">
          <img
            className="header__team-logos-img"
            src={ducksLogo}
            alt="Duck Island Saints"
          />
          <img
            className="header__team-logos-img"
            src={krakenLogo}
            alt="Kraken Beers"
          />
          <img
            className="header__team-logos-img"
            src={lepLogo}
            alt="Fogtown Leprechauns"
          />
          <img
            className="header__team-logos-img"
            src={mooseLogo}
            alt="Mighty Moose"
          />
        </section>
      </section>
    </header>
  );
};

export default Header;
