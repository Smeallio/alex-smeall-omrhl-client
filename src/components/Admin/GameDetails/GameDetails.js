import "./GameDetails.scss";

const GameDetails = ({ game }) => {
  const determineWinner = (game) => {
    if (game.team1_score > game.team2_score) {
      return game.team1_name + " win: " + game.team1_score + " - " + game.team2_score;
    } else if (game.team2_score > game.team1_score) {
      return game.team2_name + " win: " + game.team2_score + " - " + game.team1_score;
    } else {
      return "Tie game: " + game.team1_score + " - " + game.team2_score;
    }
  };

  return (
    <article className="gameDetails">
      <section className="gameDetails__block">
        <h3 className="gameDetails__block-header">Game Date & Time:</h3>
        <p className="gameDetails__block-text">{`${game.date} @ ${game.time}`}</p>
      </section>
      <section className="gameDetails__block">
        <h3 className="gameDetails__block-header">Teams:</h3>
        <p className="gameDetails__block-text">{`${game.team1_name} & ${game.team2_name}`}</p>
      </section>
      <section className="gameDetails__block">
        <h3 className="gameDetails__block-header">Result:</h3>
        <p className="gameDetails__block-text">{determineWinner(game)}</p>
      </section>
    </article>
  );
};

export default GameDetails;
