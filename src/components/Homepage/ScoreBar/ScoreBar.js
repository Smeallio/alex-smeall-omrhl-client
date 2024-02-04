import { useRef } from "react";
import saintsLogo from "../../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../../assets/images/logos/Moose-vector.png";
import chevLeft from "../../../assets/images/icons/chevron-left-icon.png";
import chevRight from "../../../assets/images/icons/chevron-right-icon.png";
import { scoreSked } from "../../../utils/scoreSked";
import "./ScoreBar.scss";

const ScoreBar = () => {
  const sliderRef = useRef(null);
  const scrollAmount = 100;

  const getImageByTeamName = (teamName) => {
    switch (teamName) {
      case "Fogtown Leprechauns":
        return lepLogo;
      case "Duck Island Saints":
        return saintsLogo;
      case "Mighty Moose":
        return mooseLogo;
      case "Kraken Beers":
        return krakenLogo;
      default:
        return null;
    }
  };

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
        {scoreSked.map((game) => (
          <section className="scorebar__box" key={game.id}>
            <section className="scorebar__box-header">
              <p className="scorebar__box-header-text">{`${game.date} @ ${game.time}`}</p>
            </section>
            <section className="scorebar__box-body">
              <img
                className="scorebar__box-body-img"
                src={getImageByTeamName(game.team1.name)}
                alt="Fogtown Leprechauns"
              />
              {game.complete ? (
                <p className="scorebar__box-body-text">{`${game.team1.score} - ${game.team2.score}`}</p>
              ) : (
                <p className="scorebar__box-body-text">vs</p>
              )}
              <img
                className="scorebar__box-body-img"
                src={getImageByTeamName(game.team2.name)}
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
