import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeader from "../../components/TeamPage/TeamHeader/TeamHeader";
import GameDetailsHeader from "../../components/BoxScore/GameDetailsHeader/GameDetailsHeader";
import Footer from "../../components/Globals/Footer/Footer";
import { useParams } from "react-router-dom";
import "./BoxScore.scss";

const BoxScore = () => {
    const { gameId } = useParams();
  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="team-main">
        <TeamHeader />
        <section className="team-main__ros-sked">
            <GameDetailsHeader gameId={gameId} />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default BoxScore;