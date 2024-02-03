import { scoreSked } from "../../utils/scoreSked";
import { useParams } from "react-router-dom";
import "./TeamSked.scss";

const TeamSked = () => {
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

  const scoresAndSked = scoreSked.filter(
    (game) => game.team1.team_id === teamId || game.team2.team_id === teamId
  );

  console.log(scoresAndSked);

  const toTitleCase = (string) => {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <article className="schedule">
      <table className="schedule__table">
        <caption className="schedule__table-title">Scores & Schedule</caption>
        <thead className="schedule__table-headers">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Opponent</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {scoresAndSked.map((game) => (
            <tr className="schedule__table-row" key={game.id}>
              <td
                className="schedule__table-name"
                data-label="Date"
              >{`${game.date} @ ${game.time}`}</td>
              <td className="schedule__table-stat" data-label="Opponent">
                {game.team1.team_id === teamId
                  ? game.team2.name
                  : game.team1.name}
              </td>
              <td className="schedule__table-stat" data-label="Result">
                {(game.complete &&
                  game.team1.team_id === teamId &&
                  toTitleCase(game.team1.result) +
                    ": " +
                    game.team1.score +
                    " - " +
                    game.team2.score) ||
                  ""}
                {(game.complete &&
                  game.team2.team_id === teamId &&
                  toTitleCase(game.team2.result) +
                    ": " +
                    game.team2.score +
                    " - " +
                    game.team1.score) ||
                  ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default TeamSked;
