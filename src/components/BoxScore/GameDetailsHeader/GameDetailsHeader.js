import "./GameDetailsHeader.scss";

const GameDetailsHeader = ({ game, getLogoByName }) => {

  //   const determineWinner = (game) => {
  //     if (game.team1_score > game.team2_score) {
  //       return (
  //         game.team1_name + " win: " + game.team1_score + " - " + game.team2_score
  //       );
  //     } else if (game.team2_score > game.team1_score) {
  //       return (
  //         game.team2_name + " win: " + game.team2_score + " - " + game.team1_score
  //       );
  //     } else {
  //       return "Tie game: " + game.team1_score + " - " + game.team2_score;
  //     }
  //   };

  if (game === null) {
    return <p>Loading...</p>;
  }

  return (
    <article className="gdh">
      <section className="gdh__game-info">
        <h1 className="gdh__game-info-title">Game Summary</h1>
        <section className="gdh__game-info-block">
          <img
            className="gdh__game-info-logo"
            src={
              game.team1_score >= game.team2_score
                ? getLogoByName(game.team1_name)
                : getLogoByName(game.team2_name)
            }
            alt={
              game.team1_score >= game.team2_score
                ? game.team1_name
                : game.team2_name
            }
          />
          <h2 className="gdh__game-info-score">
            {game.team1_score >= game.team2_score
              ? game.team1_score
              : game.team2_score}
            &nbsp;&nbsp;—&nbsp;&nbsp;
            {game.team1_score >= game.team2_score
              ? game.team2_score
              : game.team1_score}
          </h2>
          <img
            className="gdh__game-info-logo"
            src={
              game.team1_score >= game.team2_score
                ? getLogoByName(game.team2_name)
                : getLogoByName(game.team1_name)
            }
            alt={
              game.team1_score >= game.team2_score
                ? game.team2_name
                : game.team1_name
            }
          />
        </section>
        <section className="gdh__game-info-block">
          <p className="gdh__game-info-date-time">{`${game.date} @ ${game.time}`}</p>
        </section>
        <section className="gdh__block">
        <p className="gdh__game-info-text-notes">{game.notes && `${game.notes}`}</p>
      </section>
      </section>
    </article>
  );
};

export default GameDetailsHeader;
