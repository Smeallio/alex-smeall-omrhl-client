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
  const [seasonType, setSeasonType] = useState("regular");

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
      case "bears":
        formattedTeamName = "Quidi Vidi Bears";
        break;
      case "liners":
        formattedTeamName = "Witless Bay Liners";
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

  const toggleSeasonType = (type) => {
    setSeasonType(type);
  };

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="team-main">
        <section className="team-main__header">
          <TeamHeader />
          {seasonType === "regular" && (
            <button
              className="team-main__header-button"
              onClick={() => toggleSeasonType("playoffs")}
            >
              View Playoffs
            </button>
          )}
          {seasonType === "playoffs" && (
            <button
              className="team-main__header-button"
              onClick={() => toggleSeasonType("regular")}
            >
              View Regular Season
            </button>
          )}
        </section>
        <section className="team-main__ros-sked">
          <TeamRoster seasonType={seasonType} />
          <TeamSked seasonType={seasonType} />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default TeamPage;
