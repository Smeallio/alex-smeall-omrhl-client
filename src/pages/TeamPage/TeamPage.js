import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import TeamHeader from "../../components/TeamHeader/TeamHeader";
import TeamRoster from "../../components/TeamRoster/TeamRoster";
import TeamSked from "../../components/TeamSked/TeamSked";
import Footer from "../../components/Footer/Footer";
import "./TeamPage.scss";


const TeamPage = () => {
  return (
    <>
      <Header />
      <Nav />
      <TeamHeader />
      <TeamRoster />
      <TeamSked />
      <Footer />
    </>
  );
};

export default TeamPage;