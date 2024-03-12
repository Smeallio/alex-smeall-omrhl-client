import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.webp";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.webp";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.webp";
import mooseLogo from "../../../assets/images/logos/Moose-vector.webp";
import "./GoalieGoalsAgainst.scss";

const GoalieGoalsAgainst = ({ goalieStats }) => {

  const topTwentyFiveGoalieGoalsAgainst = (stats) => {
    stats.sort((a, b) => a.goalsAgainst_average - b.goalsAgainst_average);
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
    <article className="goalie-gaa-leaders">
      <table className="goalie-gaa-leaders__table">
        <caption className="goalie-gaa-leaders__table-title">Goalie Goals Against Average</caption>
        <thead className="goalie-gaa-leaders__table-headers">
          <tr className="goalie-gaa-leaders__table-row">
            <th scope="col">Name</th>
            <th scope="col">Team</th>
            <th scope="col">Pos</th>
            <th scope="col">GP</th>
            <th scope="col">GA</th>
            <th scope="col">GAA</th>
          </tr>
        </thead>
        <tbody>
          {topTwentyFiveGoalieGoalsAgainst(goalieStats).map((player) => (
            <tr className="goalie-gaa-leaders__table-row-players" key={player.player_id}>
              <td
                className="goalie-gaa-leaders__table-box goalie-gaa-leaders__table-box-name"
                data-label="Name"
              >
                {player.player_name}
              </td>
              <td
                className="goalie-gaa-leaders__table-box goalie-gaa-leaders__table-box-team"
                data-label="Team"
              >
                <img
                  className="goalie-wins-leaders__table-box-team-logo"
                  src={getImageByTeamID(player.player_teamId)}
                  alt={getNameByTeamID(player.player_teamId)}
                />
              </td>
              <td
                className="goalie-gaa-leaders__table-box goalie-gaa-leaders__table-box-position"
                data-label="Pos"
              >
                {player.player_position}
              </td>
              <td
                className="goalie-gaa-leaders__table-box goalie-gaa-leaders__table-box-games"
                data-label="GP"
              >
                {player.games_played}
              </td>
              <td
                className="goalie-gaa-leaders__table-box goalie-gaa-leaders__table-box-ga"
                data-label="G"
              >
                {player.total_goalsAgainst}
              </td>
              <td
                className="goalie-gaa-leaders__table-box goalie-gaa-leaders__table-box-gaa"
                data-label="G"
              >
                {player.goalsAgainst_average}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default GoalieGoalsAgainst;
