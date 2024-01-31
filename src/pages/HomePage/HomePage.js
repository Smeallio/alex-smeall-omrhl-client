import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Hero from "../../components/Hero/Hero";
import ScoreBar from "../../components/ScoreBar/ScoreBar"
import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <Header />
      <Nav />
      <main className="main">
      <Hero />
      <ScoreBar />
      </main>
    </>
  );
};

export default HomePage;
