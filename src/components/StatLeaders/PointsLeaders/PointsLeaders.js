import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.webp";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.webp";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.webp";
import mooseLogo from "../../../assets/images/logos/Moose-vector.webp";
import { useState } from "react";
import {
  handleHeaderClick,
  sortColumn,
} from "../../../utils/sorting-functions.js";
import "./PointsLeaders.scss";

const PointsLeaders = ({ skaterStats }) => {
  const [sort, setSort] = useState({
    keyToSort: "total_points",
    direction: "desc",
  });

  const topTwentyFivePointsScorers = (stats) => {
    stats.sort((a, b) => b.total_points - a.total_points);
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

  if (skaterStats === null) {
    return <p>Loading...</p>;
  }

  const handleHeaderClickWrapper = header => {
    handleHeaderClick(header, sort, setSort);
  };

  const sortColumnWrapper = stats => {
    return sortColumn(stats, sort);
  }

  return (
    <article className="points-leaders">
      <table className="points-leaders__table">
        <caption className="points-leaders__table-title">Points - Top 25</caption>
        <thead className="points-leaders__table-headers">
          <tr className="points-leaders__table-row">
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_name")}>Name</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_teamId")}>Team</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_position")}>Pos</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("games_played")}>GP</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_goals")}>G</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_assists")}>A</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_points")}>P</th>
          </tr>
        </thead>
        <tbody>
          {sortColumnWrapper(topTwentyFivePointsScorers(skaterStats)).map((player) => (
            <tr className="points-leaders__table-row-players" key={player.player_id}>
              <td
                className="points-leaders__table-box points-leaders__table-box-name"
                data-label="Name"
              >
                {player.player_name}
              </td>
              <td
                className="points-leaders__table-box points-leaders__table-box-team"
                data-label="Team"
              >
                <img
                  className="points-leaders__table-box-team-logo"
                  src={getImageByTeamID(player.player_teamId)}
                  alt={getNameByTeamID(player.player_teamId)}
                />
              </td>
              <td
                className="points-leaders__table-box points-leaders__table-box-position"
                data-label="Pos"
              >
                {player.player_position}
              </td>
              <td
                className="points-leaders__table-box points-leaders__table-box-games"
                data-label="GP"
              >
                {player.games_played}
              </td>
              <td
                className="points-leaders__table-box points-leaders__table-box-goals"
                data-label="G"
              >
                {player.total_goals}
              </td>
              <td
                className="points-leaders__table-box points-leaders__table-box-assists"
                data-label="A"
              >
                {player.total_assists}
              </td>
              <td
                className="points-leaders__table-box points-leaders__table-box-points"
                data-label="P"
              >
                {player.total_points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default PointsLeaders;
