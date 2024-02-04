import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeader from "../../components/TeamPage/TeamHeader/TeamHeader";
import TeamRoster from "../../components/TeamPage/TeamRoster/TeamRoster";
import TeamSked from "../../components/TeamPage/TeamSked/TeamSked";
import Footer from "../../components/Globals/Footer/Footer";
import "./TeamPage.scss";

const TeamPage = () => {
  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="team-main">
        <TeamHeader />
        <section className="team-main__ros-sked">
          <TeamRoster />
          <TeamSked />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default TeamPage;
