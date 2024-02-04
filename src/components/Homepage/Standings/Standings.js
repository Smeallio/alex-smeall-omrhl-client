import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../../assets/images/logos/Moose-vector.png";
import { teamData } from "../../../utils/teams.js";
import "./Standings.scss";

const Standings = () => {
  console.log(teamData);

  const getImageByTeamName = (teamName) => {
    switch (teamName) {
      case "Fogtown Leprechauns":
        return lepLogo;
      case "Duck Island Saints":
        return saintsLogo;
      case "Mighty Moose":
        return mooseLogo;
      case "Kraken Beers":
        return krakenLogo;
      default:
        return null;
    }
  };

  return (
    <article className="standings">
      <table className="standings__table">
        <caption className="standings__table-title">Standings</caption>
        <thead className="standings__table-headers">
          <tr>
            <th scope="col" colSpan="2">Team</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">T</th>
            <th scope="col">P</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team) => (
            <tr className="standings__table-row" key={team.id}>
              <td className="standings__table-team" data-label="Team">
                <img className="standings__table-img" src={getImageByTeamName(team.name)} alt={team.name} />
              </td>
              <td className="standings__table-name" data-label="Team">{team.name}</td>
              <td className="standings__table-wltp" data-label="W">{team.wins}</td>
              <td className="standings__table-wltp" data-label="L">{team.losses}</td>
              <td className="standings__table-wltp" data-label="T">{team.ties}</td>
              <td className="standings__table-wltp" data-label="P">{(team.wins*2)+(team.ties*1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Standings;
