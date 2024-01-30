import omrLogo from "../../assets/images/logos/OMRHL-logo-vector.png";
import ducksLogo from "../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../assets/images/logos/Moose-vector.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <section className="header__league">
        <img
          className="header__league-logo"
          src={omrLogo}
          alt="Odd Man Rush Hockey League"
        />
      </section>
      <section className="header__teams">
        <img
          className="header__teams-logo"
          src={ducksLogo}
          alt="Duck Island Saints"
        />
        <img
          className="header__teams-logo"
          src={krakenLogo}
          alt="Kraken Beers"
        />
        <img
          className="header__teams-logo"
          src={lepLogo}
          alt="Fogtown Leprechauns"
        />
        <img
          className="header__teams-logo"
          src={mooseLogo}
          alt="Mighty Moose"
        />
      </section>
    </header>
  );
};

export default Header;
