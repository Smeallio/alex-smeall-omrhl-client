import { players } from "../../../utils/players";
import { useParams } from "react-router-dom";
import "./TeamRoster.scss";

const TeamRoster = () => {
  const { teamName } = useParams();

  let teamId;

  switch (teamName) {
    case "leprechauns":
      teamId = 1;
      break;
    case "saints":
      teamId = 2;
      break;
    case "moose":
      teamId = 3;
      break;
    case "kraken":
      teamId = 4;
      break;
  }

  const skaterData = players.filter(
    (player) => player.team_id === teamId && player.position !== "G"
  );
  const goalieData = players.filter(
    (player) => player.team_id === teamId && player.position === "G"
  );

  return (
    <article className="roster">
      <table className="roster__table">
        <caption className="roster__table-title">
          Roster & Statistics (Skaters)
        </caption>
        <thead className="roster__table-headers">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">No.</th>
            <th scope="col">Pos.</th>
            <th scope="col">GP</th>
            <th scope="col">G</th>
            <th scope="col">A</th>
            <th scope="col">P</th>
          </tr>
        </thead>
        <tbody>
          {skaterData.map((player) => (
            <tr className="roster__table-row" key={player.id}>
              <td className="roster__table-name" data-label="Name">
                {player.name}
              </td>
              <td className="roster__table-stat" data-label="No.">
                {player.number}
              </td>
              <td className="roster__table-stat" data-label="Pos.">
                {player.position}
              </td>
              <td className="roster__table-stat" data-label="GP">
                {player.games}
              </td>
              <td className="roster__table-stat" data-label="G">
                {player.goals}
              </td>
              <td className="roster__table-stat" data-label="A">
                {player.assists}
              </td>
              <td className="roster__table-stat" data-label="P">
                {player.goals + player.assists}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="roster__table">
        <caption className="roster__table-title">
          Roster & Statistics (Goalies)
        </caption>
        <thead className="roster__table-headers">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">No.</th>
            <th scope="col">Pos.</th>
            <th scope="col">GP</th>
            <th scope="col">W</th>
            <th scope="col">GAA</th>
          </tr>
        </thead>
        <tbody>
          {goalieData.map((player) => (
            <tr className="roster__table-row" key={player.id}>
              <td className="roster__table-name" data-label="Name">
                {player.name}
              </td>
              <td className="roster__table-stat" data-label="No.">
                {player.number}
              </td>
              <td className="roster__table-stat" data-label="Pos.">
                {player.position}
              </td>
              <td className="roster__table-stat" data-label="GP">
                {player.games}
              </td>
              <td className="roster__table-stat" data-label="W">
                {player.wins}
              </td>
              <td className="roster__table-stat" data-label="GAA">
                {(player.goalsAgainst / player.games).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default TeamRoster;
