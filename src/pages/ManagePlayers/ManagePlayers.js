import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeader from "../../components/TeamPage/TeamHeader/TeamHeader";
import AddPlayers from "../../components/ManagePlayers/AddPlayers/AddPlayers";
import EditPlayers from "../../components/ManagePlayers/EditPlayers/EditPlayers"
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByTeam } from "../../utils/api-utils";
import "./ManagePlayers.scss";

const ManagePlayers = () => {
  const { teamName } = useParams();

  const [players, setPlayers] = useState(null);
  const [teamId, setTeamId] = useState(null);


  useEffect(() => {
    let numTeamId;

    switch (teamName) {
      case "leprechauns":
        numTeamId = 1;
        break;
      case "saints":
        numTeamId = 2;
        break;
      case "moose":
        numTeamId = 3;
        break;
      case "kraken":
        numTeamId = 4;
        break;
      default:
        alert("Invalid team name");
        break;
    }

    setTeamId(numTeamId);
  }, [teamName]);

  const fetchPlayers = async () => {
    try {
      if (teamId !== null) {
        const response = await axios.get(getPlayersByTeam(teamId));
        setPlayers(response.data);
      }
    } catch(err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  if (players === null) {
    return <p>Loading...</p>;
  }

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <TeamHeader />
        <AddPlayers teamId={teamId} fetchPlayers={fetchPlayers} />
        <EditPlayers players={players} teamId={teamId} fetchPlayers={fetchPlayers} />
      </main>
      <Footer />
    </section>
  );
};

export default ManagePlayers;
