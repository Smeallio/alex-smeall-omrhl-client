import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGames } from "../../utils/api-utils";
import "./ScoreSked.scss";

const ScoreSked = () => {
  const [games, setGames] = useState(null);

  const fetchGames = async () => {
    try {
      const response = await axios.get(getGames());
      const allGames = response.data;
      setGames(allGames);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (games === null) {
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

  console.log(games);

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="scoreSked">
        <article className="scoreSked__regszn">
          <section className="scorSsked__regszn-block">
            <table className="scoreSked__regszn-table">
              <caption className="scoreSked__regszn-table-title">
                Regular Season Games
              </caption>
              <thead className="scoreSked__regszn-table-headers">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Matchup</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr className="scoreSked__regszn-table-row" key={game.id}>
                    <td
                      className="scoreSked__regszn-table-box scoreSked__regszn-table-date"
                      data-label="Date"
                    >{`${game.date} @ ${game.time}`}</td>
                    <td
                      className="scoreSked__regszn-table-box scoreSked__regszn-table-matchup"
                      data-label="Matchup"
                    >
                      {`${game.team1_name} vs. ${game.team2_name}`}
                    </td>
                    <td
                      className="scoreSked__regszn-table-box scoreSked__regszn-table-res"
                      data-label="Result"
                    >
                      <Link
                        className="scoreSked__regszn-table-res-link"
                        to={`/games/${game.id}`}
                      >
                        {game.complete ? determineWinner(game) : " "}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default ScoreSked;
