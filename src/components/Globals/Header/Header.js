import omrLogo from "../../../assets/images/logos/OMRHL-logo-vector.png";
import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../../assets/images/logos/Moose-vector.png";
import saintsLogoGrey from "../../../assets/images/logos/Duck-Island-Saints-vector-grey.png";
import krakenLogoGrey from "../../../assets/images/logos/Kraken-Beers-vector-grey.png";
import lepLogoGrey from "../../../assets/images/logos/Leprechauns-vector-grey.png";
import mooseLogoGrey from "../../../assets/images/logos/Moose-vector-grey.png";
import { Link, useParams } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const { teamName } = useParams();

  let saints, kraken, leprechauns, moose;

  switch (teamName) {
    case undefined:
      saints = saintsLogo;
      kraken = krakenLogo;
      leprechauns = lepLogo;
      moose = mooseLogo;
      break;
    case "saints":
      saints = saintsLogo;
      kraken = krakenLogoGrey;
      leprechauns = lepLogoGrey;
      moose = mooseLogoGrey;
      break;
    case "kraken":
      saints = saintsLogoGrey;
      kraken = krakenLogo;
      leprechauns = lepLogoGrey;
      moose = mooseLogoGrey;
      break;
    case "leprechauns":
      saints = saintsLogoGrey;
      kraken = krakenLogoGrey;
      leprechauns = lepLogo;
      moose = mooseLogoGrey;
      break;
    case "moose":
      saints = saintsLogoGrey;
      kraken = krakenLogoGrey;
      leprechauns = lepLogoGrey;
      moose = mooseLogo;
      break;
    default:
      return null;
  }

  return (
    <header className="header">
      <section className="header__container">
        <section className="header__league-logo">
          <Link className="header__league-logo-link" to="/">
            <img
              className="header__league-logo-img"
              src={omrLogo}
              alt="Odd Man Rush Hockey League"
            />
          </Link>
        </section>
        <section className="header__team-logos">
          <Link className="header__team-logos-link" to="/teams/saints">
            <img
              className="header__team-logos-img"
              src={saints}
              alt="Duck Island Saints"
            />
          </Link>
          <Link className="header__team-logos-link" to="/teams/kraken">
            <img
              className="header__team-logos-img"
              src={kraken}
              alt="Kraken Beers"
            />
          </Link>
          <Link className="header__team-logos-link" to="/teams/leprechauns">
            <img
              className="header__team-logos-img"
              src={leprechauns}
              alt="Fogtown Leprechauns"
            />
          </Link>
          <Link className="header__team-logos-link" to="/teams/moose">
            <img
              className="header__team-logos-img"
              src={moose}
              alt="Mighty Moose"
            />
          </Link>
        </section>
      </section>
    </header>
  );
};

export default Header;
