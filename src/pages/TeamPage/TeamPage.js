import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeader from "../../components/TeamPage/TeamHeader/TeamHeader";
import TeamRoster from "../../components/TeamPage/TeamRoster/TeamRoster";
import TeamSked from "../../components/TeamPage/TeamSked/TeamSked";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../../components/Globals/Footer/Footer";
import "./TeamPage.scss";

const TeamPage = () => {
  const { teamName } = useParams();

  const [fullTeamName, setFullTeamName] = useState(null);

  useEffect(() => {
    let formattedTeamName;

    switch (teamName) {
      case "leprechauns":
        formattedTeamName = "Fogtown Leprechauns";
        break;
      case "saints":
        formattedTeamName = "Duck Island Saints";
        break;
      case "moose":
        formattedTeamName = "Might Moose";
        break;
      case "kraken":
        formattedTeamName = "Kraken Beers";
        break;
      default:
        alert("Invalid team name");
        break;
    }

    setFullTeamName(formattedTeamName);
  }, [teamName]);

  useEffect(() => {
    if (fullTeamName !== null) {
    document.title = `Odd Man Rush Hockey League - ${fullTeamName}`;
    }
  }, [fullTeamName]);

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
