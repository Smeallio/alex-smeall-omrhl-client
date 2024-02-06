import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../../assets/images/logos/Moose-vector.png";
import chevLeft from "../../../assets/images/icons/chevron-left-icon.png";
import chevRight from "../../../assets/images/icons/chevron-right-icon.png";
import { useRef } from "react";
import "./ScoreBar.scss";

const ScoreBar = ({ games }) => {
  const sliderRef = useRef(null);
  const scrollAmount = 100;

  const getImageByTeamId = (teamName) => {
    switch (teamName) {
      case 1:
        return lepLogo;
      case 2:
        return saintsLogo;
      case 3:
        return mooseLogo;
      case 4:
        return krakenLogo;
      default:
        return null;
    }
  };

  if (games === null) {
    return <p>Loading...</p>;
  }

  const sortedGames = games.sort((a, b) => a.date - b.date);

  console.log(sortedGames);

  const completeGames = sortedGames
    .filter((game) => game.complete === 1)
    .slice(-2);
  const pendingGames = sortedGames
    .filter((game) => game.complete === 0)
    .slice(0, 2);
  const closestGames = [...completeGames, ...pendingGames];

  return (
    <article className="scorebar" id="scorebar">
      <button
        className="scorebar__button scorebar__button-left"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft -= scrollAmount;
        }}
      >
        <img
          className="scorebar__button-img"
          src={chevLeft}
          alt="Chevron left"
        />
      </button>
      <section className="scorebar__container" ref={sliderRef}>
        {closestGames.map((game) => (
          <section className="scorebar__box" key={game.id}>
            <section className="scorebar__box-header">
              <p className="scorebar__box-header-text">{`${game.date} @ ${game.time}`}</p>
            </section>
            <section className="scorebar__box-body">
              <img
                className="scorebar__box-body-img"
                src={getImageByTeamId(game.team1_team_id)}
                alt="Fogtown Leprechauns"
              />
              {game.complete ? (
                <p className="scorebar__box-body-text">{`${game.team1_score} - ${game.team2_score}`}</p>
              ) : (
                <p className="scorebar__box-body-text">vs</p>
              )}
              <img
                className="scorebar__box-body-img"
                src={getImageByTeamId(game.team2_team_id)}
                alt="Fogtown Leprechauns"
              />
            </section>
          </section>
        ))}
      </section>
      <button
        className="scorebar__button scorebar__button-right"
        onClick={() => {
          const container = sliderRef.current;
          container.scrollLeft += scrollAmount;
        }}
      >
        <img
          className="scorebar__button-img"
          src={chevRight}
          alt="Chevron left"
        />
      </button>
    </article>
  );
};

export default ScoreBar;
