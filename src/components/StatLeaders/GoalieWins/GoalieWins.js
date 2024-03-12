import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.webp";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.webp";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.webp";
import mooseLogo from "../../../assets/images/logos/Moose-vector.webp";
import "./GoalieWins.scss";

const GoalieWins = ({ goalieStats }) => {

  const topTwentyFiveGoalieWins = (stats) => {
    stats.sort((a, b) => b.total_wins - a.total_wins);
    return stats.slice(0, 25);
  };

  const getImageByTeamID = (teamId) => {
    switch (teamId) {
      case 1:
        return lepLogo;
      case 2:
        return saintsLogo;
      case 3:
        return mooseLogo;
      case 4:
        return krakenLogo;
      default:
        return null;
    }
  };

  const getNameByTeamID = (teamId) => {
    switch (teamId) {
      case 1:
        return "Fogtown Leprechauns";
      case 2:
        return "Duck Island Saints";
      case 3:
        return "Mighty Moose";
      case 4:
        return "Kraken Beers";
      default:
        return null;
    }
  };

  if (goalieStats === null) {
    return <p>Loading...</p>;
  }

  return (
    <article className="goalie-wins-leaders">
      <table className="goalie-wins-leaders__table">
        <caption className="goalie-wins-leaders__table-title">Goalie Wins</caption>
        <thead className="goalie-wins-leaders__table-headers">
          <tr className="goalie-wins-leaders__table-row">
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">Pos</th>
            <th scope="col">GP</th>
            <th scope="col">W</th>
          </tr>
        </thead>
        <tbody>
          {topTwentyFiveGoalieWins(goalieStats).map((player) => (
            <tr className="goalie-wins-leaders__table-row-players" key={player.player_id}>
              <td
                className="goalie-wins-leaders__table-box goalie-wins-leaders__table-box-name"
                data-label="Name"
              >
                {player.player_name}
              </td>
              <td
                className="goalie-wins-leaders__table-box goalie-wins-leaders__table-box-team"
                data-label="Team"
              >
                <img
                  className="goalie-wins-leaders__table-box-team-logo"
                  src={getImageByTeamID(player.player_teamId)}
                  alt={getNameByTeamID(player.player_teamId)}
                />
              </td>
              <td
                className="goalie-wins-leaders__table-box goalie-wins-leaders__table-box-position"
                data-label="Pos"
              >
                {player.player_position}
              </td>
              <td
                className="goalie-wins-leaders__table-box goalie-wins-leaders__table-box-games"
                data-label="GP"
              >
                {player.games_played}
              </td>
              <td
                className="goalie-wins-leaders__table-box goalie-wins-leaders__table-box-goals"
                data-label="G"
              >
                {player.total_wins}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default GoalieWins;
