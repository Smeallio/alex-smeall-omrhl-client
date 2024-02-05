import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../../assets/images/logos/Moose-vector.png";
import "./Standings.scss";

const Standings = ({ games }) => {

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

  const getIdByTeam = (teamName) => {
    switch (teamName) {
      case "Fogtown Leprechauns":
        return 1;
      case "Duck Island Saints":
        return 2;
      case "Mighty Moose":
        return 3;
      case "Kraken Beers":
        return 4;
      default:
        return null;
    }
  }

  if (games === null) {
    return <p>Loading...</p>;
  }
  
  const teamResults = {};
  
  games.forEach((game) => {
    if (!teamResults[game.team1_name]) {
      teamResults[game.team1_name] = { win: 0, loss: 0, tie: 0 };
    }
  
    if (game.team1_result === "win") {
      teamResults[game.team1_name].win++;
    } else if (game.team1_result === "loss") {
      teamResults[game.team1_name].loss++;
    } else if (game.team1_result === "tie") {
      teamResults[game.team1_name].tie++;
    }

    if (!teamResults[game.team2_name]) {
      teamResults[game.team2_name] = { win: 0, loss: 0, tie: 0 };
    }
  
    if (game.team2_result === "win") {
      teamResults[game.team2_name].win++;
    } else if (game.team2_result === "loss") {
      teamResults[game.team2_name].loss++;
    } else if (game.team2_result === "tie") {
      teamResults[game.team2_name].tie++;
    }
  });

  console.log(games);

  console.log(teamResults);

  const standingsArray = Object.keys(teamResults).map((teamName) => ({
    name: teamName,
    id: getIdByTeam(teamName),
    wins: teamResults[teamName].win,
    losses: teamResults[teamName].loss,
    ties: teamResults[teamName].tie,
    totalPoints: teamResults[teamName].win * 2 + teamResults[teamName].tie *1
  }))

  standingsArray.sort((a,b) => b.totalPoints - a.totalPoints);

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
          {standingsArray.map((team) => (
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
