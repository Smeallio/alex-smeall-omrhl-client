import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.webp";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.webp";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.webp";
import mooseLogo from "../../../assets/images/logos/Moose-vector.webp";
import bearsLogo from "../../../assets/images/logos/Quidi-Vidi-Bears-vector.webp";
import linersLogo from "../../../assets/images/logos/Witless-Bay-Liners-vector.webp";
import { useParams } from "react-router-dom";
import "./TeamHeader.scss";

const TeamHeader = () => {
  const { teamName } = useParams();

  let teamLogo, fullTeamName;

  switch (teamName) {
    case "saints":
      teamLogo = saintsLogo;
      fullTeamName = "Duck Island Saints";
      break;
    case "kraken":
      teamLogo = krakenLogo;
      fullTeamName = "Kraken Beers";
      break;
    case "leprechauns":
      teamLogo = lepLogo;
      fullTeamName = "Fogtown Leprechauns";
      break;
    case "moose":
      teamLogo = mooseLogo;
      fullTeamName = "Mighty Moose";
      break;
    case "bears":
      teamLogo = bearsLogo;
      fullTeamName = "Quidi Vidi Bears";
      break;
    case "liners":
      teamLogo = linersLogo;
      fullTeamName = "Witless Bay Liners";
      break;
    default:
      return null;
  }

  return (
    <article className="teamHeader">
      <section className="teamHeader__title">
        <img
          className="teamHeader__title-logo"
          src={teamLogo}
          alt={fullTeamName}
        />
        <h1 className="teamHeader__title-teamname">{fullTeamName}</h1>
      </section>
    </article>
  );
};

export default TeamHeader;
