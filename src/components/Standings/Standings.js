import ducksLogo from "../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../assets/images/logos/Moose-vector.png";
import { teamData } from "../../utils/teams.js";
import "./Standings.scss";

const Standings = () => {
  console.log(teamData);

  const getImageByTeamName = (teamName) => {
    switch (teamName) {
      case "Fogtown Leprechauns":
        return lepLogo;
      case "Duck Island Saints":
        return ducksLogo;
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
            <th colspan="2">Team</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team) => (
            <tr className="standings__table-row" key={team.id}>
              <td className="standings__table-team">
                <img className="standings__table-img" src={getImageByTeamName(team.name)} alt={team.name} />
              </td>
              <td className="standings__table-name">{team.name}</td>
              <td className="standings__table-wltp">{team.wins}</td>
              <td className="standings__table-wltp">{team.losses}</td>
              <td className="standings__table-wltp">{team.ties}</td>
              <td className="standings__table-wltp">{(team.wins*2)+(team.ties*1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Standings;
