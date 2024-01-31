import { useRef } from "react";
import ducksLogo from "../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../assets/images/logos/Moose-vector.png";
import chevLeft from "../../assets/images/icons/chevron-left-icon.png";
import chevRight from "../../assets/images/icons/chevron-right-icon.png";
import "./ScoreBar.scss";

const ScoreBar = () => {
    const sliderRef = useRef(null);
    const scrollAmount = 100;

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
        <section className="scorebar__box">
          <section className="scorebar__box-header">
            <p className="scorebar__box-header-text">Tues, Feb 6 @ 9pm</p>
          </section>
          <section className="scorebar__box-body">
            <img
              className="scorebar__box-body-img"
              src={lepLogo}
              alt="Fogtown Leprechauns"
            />
            <p className="scorebar__box-body-text">6 - 3</p>
            <img
              className="scorebar__box-body-img"
              src={mooseLogo}
              alt="Mighty Moose"
            />
          </section>
        </section>
        <section className="scorebar__box">
          <section className="scorebar__box-header">
            <p className="scorebar__box-header-text">Tues, Feb 6 @ 10pm</p>
          </section>
          <section className="scorebar__box-body">
            <img
              className="scorebar__box-body-img"
              src={ducksLogo}
              alt="Duck Island Saints"
            />
            <p className="scorebar__box-body-text">4 - 5</p>
            <img
              className="scorebar__box-body-img"
              src={krakenLogo}
              alt="Kraken Beers"
            />
          </section>
        </section>
        <section className="scorebar__box">
          <section className="scorebar__box-header">
            <p className="scorebar__box-header-text">Tues, Feb 6 @ 11pm</p>
          </section>
          <section className="scorebar__box-body">
            <img
              className="scorebar__box-body-img"
              src={lepLogo}
              alt="Fogtown Leprechauns"
            />
            <p className="scorebar__box-body-text">6 - 3</p>
            <img
              className="scorebar__box-body-img"
              src={mooseLogo}
              alt="Mighty Moose"
            />
          </section>
        </section>
        <section className="scorebar__box">
          <section className="scorebar__box-header">
            <p className="scorebar__box-header-text">Tues, Feb 6 @ 12pm</p>
          </section>
          <section className="scorebar__box-body">
            <img
              className="scorebar__box-body-img"
              src={ducksLogo}
              alt="Duck Island Saints"
            />
            <p className="scorebar__box-body-text">4 - 5</p>
            <img
              className="scorebar__box-body-img"
              src={krakenLogo}
              alt="Kraken Beers"
            />
          </section>
        </section>
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
