import McNivensOmrhlLogo from "../../../assets/images/logos/McNivens-OMRHL-logo.webp";
import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.webp";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.webp";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.webp";
import mooseLogo from "../../../assets/images/logos/Moose-vector.webp";
import bearsLogo from "../../../assets/images/logos/Quidi-Vidi-Bears-vector.webp";
import linersLogo from "../../../assets/images/logos/Witless-Bay-Liners-Vector.webp";
import saintsLogoGrey from "../../../assets/images/logos/Duck-Island-Saints-vector-grey.webp";
import krakenLogoGrey from "../../../assets/images/logos/Kraken-Beers-vector-grey.webp";
import lepLogoGrey from "../../../assets/images/logos/Leprechauns-vector-grey.webp";
import mooseLogoGrey from "../../../assets/images/logos/Moose-vector-grey.webp";
import { Link, useParams } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const { teamName } = useParams();

  let saints, kraken, leprechauns, liners, moose, bears;

  switch (teamName) {
    case undefined:
      saints = saintsLogo;
      kraken = krakenLogo;
      leprechauns = lepLogo;
      moose = mooseLogo;
      bears = bearsLogo;
      liners = linersLogo;
      break;
    case "saints":
      saints = saintsLogo;
      kraken = krakenLogoGrey;
      leprechauns = lepLogoGrey;
      moose = mooseLogoGrey;
      bears = bearsLogo;
      liners = linersLogo;
      break;
    case "kraken":
      saints = saintsLogoGrey;
      kraken = krakenLogo;
      leprechauns = lepLogoGrey;
      moose = mooseLogoGrey;
      bears = bearsLogo;
      liners = linersLogo;
      break;
    case "leprechauns":
      saints = saintsLogoGrey;
      kraken = krakenLogoGrey;
      leprechauns = lepLogo;
      moose = mooseLogoGrey;
      bears = bearsLogo;
      liners = linersLogo;
      break;
    case "moose":
      saints = saintsLogoGrey;
      kraken = krakenLogoGrey;
      leprechauns = lepLogoGrey;
      moose = mooseLogo;
      bears = bearsLogo;
      liners = linersLogo;
      break;
    case "bears":
      saints = saintsLogoGrey;
      kraken = krakenLogoGrey;
      leprechauns = lepLogoGrey;
      moose = mooseLogo;
      bears = bearsLogo;
      liners = linersLogo;
      break;
    case "liners":
      saints = saintsLogoGrey;
      kraken = krakenLogoGrey;
      leprechauns = lepLogoGrey;
      moose = mooseLogo;
      bears = bearsLogo;
      liners = linersLogo;
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
              src={McNivensOmrhlLogo}
              alt="McNiven's Odd Man Rush Hockey League"
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
          <Link className="header__team-logos-link" to="/teams/bears">
            <img
              className="header__team-logos-img"
              src={bears}
              alt="Quidi Vidi Bears"
            />
          </Link>
          <Link className="header__team-logos-link" to="/teams/liners">
            <img
              className="header__team-logos-img"
              src={liners}
              alt="Witless Bay Liners"
            />
          </Link>
        </section>
      </section>
    </header>
  );
};

export default Header;
