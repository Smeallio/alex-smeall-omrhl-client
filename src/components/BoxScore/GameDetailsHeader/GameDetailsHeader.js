import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../../assets/images/logos/Moose-vector.png";
import "./GameDetailsHeader.scss";

const GameDetailsHeader = ({ game }) => {

  const getLogoByName = (teamName) => {
    if (teamName === "Fogtown Leprechauns") {
      return lepLogo;
    } else if (teamName === "Duck Island Saints") {
      return saintsLogo;
    } else if (teamName === "Mighty Moose") {
      return mooseLogo;
    } else if (teamName === "Kraken Beers") {
      return krakenLogo;
    }
  };

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
      <section className="gdh_game-info">
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
        {/* <section className="gdh__block">
        <p className="gdh__block-text-notes">{game.notes && `${game.notes}`}</p>
      </section> */}
      </section>
    </article>
  );
};

export default GameDetailsHeader;
