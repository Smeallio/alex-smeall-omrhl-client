import heroImage from "../../../assets/images/games/Odd-Man-Rush-Hockey-League-Action.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Hero.scss";

const Hero = () => {

  return (
    <article className="hero">
      <LazyLoadImage
      src={heroImage}
      alt="Odd Man Rush Hockey League"
      className="hero__image"
      />
      <section className="hero__text">
        <h1 className="hero__h1">
          Newfoundland & Labrador's First 3 v 3 Ice Hockey League
        </h1>
      </section>
    </article>
  );
};

export default Hero;
