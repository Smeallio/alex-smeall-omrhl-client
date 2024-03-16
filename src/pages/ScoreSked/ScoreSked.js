import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import RegSeason from "../../components/ScoreSked/RegSeason/RegSeason";
import Playoffs from "../../components/ScoreSked/Playoffs/Playoffs";
import Footer from "../../components/Globals/Footer/Footer";
import "./ScoreSked.scss";


const ScoreSked = () => {
  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="scoreSked">
        <h1 className="scoreSked__header">Scores & Schedule</h1>
        <RegSeason />
        <Playoffs />
      </main>
      <Footer />
    </section>
  );
};

export default ScoreSked;
