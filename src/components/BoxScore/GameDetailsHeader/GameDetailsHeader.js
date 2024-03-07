import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getOneGame } from "../../../utils/api-utils";
import "./GameDetailsHeader.scss";

const GameDetailsHeader = ( {gameId} ) => {

  const [game, setGame] = useState(null);

  const fetchGame = useCallback(async () => {
    try {
      const response = await axios.get(getOneGame(gameId));
      setGame(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [gameId, fetchGame]);

  const determineWinner = (game) => {
    if (game.team1_score > game.team2_score) {
      return game.team1_name + " win: " + game.team1_score + " - " + game.team2_score;
    } else if (game.team2_score > game.team1_score) {
      return game.team2_name + " win: " + game.team2_score + " - " + game.team1_score;
    } else {
      return "Tie game: " + game.team1_score + " - " + game.team2_score;
    }
  };

  if (game === null) {
    return <p>Loading...</p>;
  }

  return (
    <article className="BoxScore">
      <section className="BoxScore__block">
        <h3 className="BoxScore__block-header">Game Date & Time:</h3>
        <p className="BoxScore__block-text">{`${game.date} @ ${game.time}`}</p>
      </section>
      <section className="BoxScore__block">
        <h3 className="BoxScore__block-header">Teams:</h3>
        <p className="BoxScore__block-text">{`${game.team1_name} & ${game.team2_name}`}</p>
      </section>
      <section className="BoxScore__block">
        <h3 className="BoxScore__block-header">Result:</h3>
        <p className="BoxScore__block-text">{determineWinner(game)}</p>
      </section>
    </article>
  );
};

export default GameDetailsHeader;
