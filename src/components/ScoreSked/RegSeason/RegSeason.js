import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRegSeasonGames } from "../../../utils/api-utils";
import "./RegSeason.scss";

const RegSeason = () => {
  const [regSeasonGames, setRegSeasonGames] = useState(null);

  const fetchRegSeasonGames = async () => {
    try {
      const response = await axios.get(getRegSeasonGames());
      const seasonGames = response.data;
      setRegSeasonGames(seasonGames);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRegSeasonGames();
  }, []);

  if (regSeasonGames === null) {
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
    <article className="regszn">
      <section className="regszn__block">
        <table className="regszn__table">
          <caption className="regszn__table-title">
            Regular Season Games
          </caption>
          <thead className="regszn__table-headers">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Matchup</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {regSeasonGames.map((game) => (
              <tr className="regszn__table-row" key={game.id}>
                <td
                  className="regszn__table-box regszn__table-date"
                  data-label="Date"
                >{`${game.date} @ ${game.time}`}</td>
                <td
                  className="regszn__table-box regszn__table-matchup"
                  data-label="Matchup"
                >
                  {`${game.team1_name} vs. ${game.team2_name}`}
                </td>
                <td
                  className="regszn__table-box regszn__table-res"
                  data-label="Result"
                >
                  {game.complete ? (
                    <Link
                      className="regszn__table-res-link"
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

export default RegSeason;
