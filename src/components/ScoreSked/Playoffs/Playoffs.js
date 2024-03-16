import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlayoffGames } from "../../../utils/api-utils";
import "./Playoffs.scss";

const Playoffs = () => {
  const [playoffGames, setPlayoffGames] = useState(null);

  const fetchPlayoffGames = async () => {
    try {
      const response = await axios.get(getPlayoffGames());
      const poGames = response.data;
      setPlayoffGames(poGames);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchPlayoffGames();
  }, []);

  if (playoffGames === null) {
    return <p>Loading...</p>;
  }

  const determineWinner = (game) => {
    if (game.team1_score > game.team2_score) {
      return (
        game.team1_name + " win " + game.team1_score + " - " + game.team2_score
      );
    } else if (game.team2_score > game.team1_score) {
      return (
        game.team2_name + " win " + game.team2_score + " - " + game.team1_score
      );
    } else {
      return "Tie game: " + game.team1_score + " - " + game.team2_score;
    }
  };

  return (
    <article className="playoff">
      <section className="playoff__block">
        <table className="playoff__table">
          <caption className="playoff__table-title">
            Playoff Games
          </caption>
          <thead className="playoff__table-headers">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Matchup</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {playoffGames.map((game) => (
              <tr className="playoff__table-row" key={game.id}>
                <td
                  className="playoff__table-box playoff__table-date"
                  data-label="Date"
                >{`${game.date} @ ${game.time}`}</td>
                <td
                  className="playoff__table-box playoff__table-matchup"
                  data-label="Matchup"
                >
                  {`${game.team1_name} vs. ${game.team2_name}`}
                </td>
                <td
                  className="playoff__table-box playoff__table-res"
                  data-label="Result"
                >
                  {game.complete ? (
                    <Link
                      className="playoff__table-res-link"
                      to={`/games/${game.id}`}
                    >
                      {determineWinner(game)}
                    </Link>
                  ) : (
                    "TBD"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
};

export default Playoffs;
