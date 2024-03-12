import { useEffect } from "react";
import heroImage from "../../../assets/images/games/Odd-Man-Rush-Hockey-League-Action.webp";
import "./Hero.scss";

const Hero = () => {

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
  }, []);

  const backgroundImageStyle = {
    background: `url(${heroImage})  no-repeat center/cover`
  }

    return (
          <article className="hero" style={backgroundImageStyle}>
            <section className="hero__text">
                <h1 className="hero__h1">Newfoundland & Labrador's First 3 v 3 Ice Hockey League</h1>
            </section>
          </article>
    );
  };
  
  export default Hero;