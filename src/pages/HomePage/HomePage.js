import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Hero from "../../components/Homepage/Hero/Hero";
import ScoreBar from "../../components/Homepage/ScoreBar/ScoreBar";
import Standings from "../../components/Homepage/Standings/Standings";
import Announcements from "../../components/Homepage/Accouncements/Announcements";
import Footer from "../../components/Globals/Footer/Footer";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="home-main">
        <Hero />
        <ScoreBar />
        <section className="home-main__stand-announce">
          <Standings />
          <Announcements />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default HomePage;
