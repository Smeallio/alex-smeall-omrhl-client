import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Hero from "../../components/Homepage/Hero/Hero";
import ScoreBar from "../../components/Homepage/ScoreBar/ScoreBar";
import Standings from "../../components/Homepage/Standings/Standings";
import Announcements from "../../components/Homepage/Accouncements/Announcements";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { getGames } from "../../utils/api-utils";
import "./HomePage.scss";

const HomePage = () => {
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

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="home-main">
        <Hero />
        <ScoreBar games={games} />
        <section className="home-main__stand-announce">
          <Standings games={games} />
          <Announcements />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default HomePage;
