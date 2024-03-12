import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.webp";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.webp";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.webp";
import mooseLogo from "../../../assets/images/logos/Moose-vector.webp";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./TeamHeaderAdmin.scss";

const TeamHeaderAdmin = () => {
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
    default:
        return null;
  }

  return (
    <article className="teamHeaderAdmin">
      <section className="teamHeaderAdmin__title">
      <Link className="teamHeaderAdmin__link" to="/admin/dashboard/">
        <FontAwesomeIcon
          className="teamHeaderAdmin__link-back-icon"
          icon={faArrowLeft}
        />
        </Link>
        <img
          className="teamHeaderAdmin__title-logo"
          src={teamLogo}
          alt={fullTeamName}
        />
        <h1 className="teamHeaderAdmin__title-teamname">{fullTeamName}</h1>
      </section>
    </article>
  );
};

export default TeamHeaderAdmin;
