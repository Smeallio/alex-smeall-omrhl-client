import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { getGames } from "../../../utils/api-utils";
import "./TeamSked.scss";

const TeamSked = () => {
  const { teamName } = useParams();

  const [games, setGames] = useState(null);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    let numTeamId;

    switch (teamName) {
      case "leprechauns":
        numTeamId = 1;
        break;
      case "saints":
        numTeamId = 2;
        break;
      case "moose":
        numTeamId = 3;
        break;
      case "kraken":
        numTeamId = 4;
        break;
      default:
        alert("Invalid team name");
        break;
    }

    setTeamId(numTeamId);
  }, [teamName]);

  useEffect(() => {
    const fetchGamesByTeam = async () => {
      try {
        if (teamId !== null) {
          const response = await axios.get(getGames());
          const allGames = response.data;
          const gamesByTeam = allGames.filter(
            (game) =>
              game.team1_team_id === teamId || game.team2_team_id === teamId
          );
          setGames(gamesByTeam);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchAndSetGames = async () => {
      await fetchGamesByTeam();
    };

    fetchAndSetGames();
  }, [teamId]);

  const toTitleCase = (string) => {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  if (games === null) {
    return <p>Loading...</p>;
  }

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
          {games.map((game) => (
            <tr className="schedule__table-row" key={game.id}>
              <td
                className="schedule__table-name"
                data-label="Date"
              >{`${game.date} @ ${game.time}`}</td>
              <td className="schedule__table-stat" data-label="Opponent">
                {game.team1_team_id === teamId
                  ? game.team2_name
                  : game.team1_name}
              </td>
              <td className="schedule__table-stat" data-label="Result">
                {(game.complete &&
                  game.team1_team_id === teamId &&
                  toTitleCase(game.team1_result) +
                    ": " +
                    game.team1_score +
                    " - " +
                    game.team2_score) ||
                  ""}
                {(game.complete &&
                  game.team2_team_id === teamId &&
                  toTitleCase(game.team2_result) +
                    ": " +
                    game.team2_score +
                    " - " +
                    game.team1_score) ||
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
