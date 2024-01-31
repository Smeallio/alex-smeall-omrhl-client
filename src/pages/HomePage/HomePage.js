import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Hero from "../../components/Hero/Hero";
import ScoreBar from "../../components/ScoreBar/ScoreBar";
import Standings from "../../components/Standings/Standings";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <Header />
      <Nav />
      <main className="main">
      <Hero />
      <ScoreBar />
      <Standings />
      </main>
    </>
  );
};

export default HomePage;
