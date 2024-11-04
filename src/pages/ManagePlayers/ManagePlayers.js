import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeaderAdmin from "../../components/Admin/TeamHeaderAdmin/TeamHeaderAdmin";
import AddPlayers from "../../components/Admin/AddPlayers/AddPlayers";
import EditPlayers from "../../components/Admin/EditPlayers/EditPlayers";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByTeam } from "../../utils/api-utils";
import "./ManagePlayers.scss";

const ManagePlayers = ({ authUser }) => {
  const { teamName } = useParams();

  const [players, setPlayers] = useState(null);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    document.title = "Odd Man Rush Hockey League - Players Dashboard";
  }, []);

  const fetchPlayers = useCallback(async () => {
    try {
      if (teamId !== null) {
        const response = await axios.get(getPlayersByTeam(teamId));
        setPlayers(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [teamId]);

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
      case "liners":
        numTeamId = 5;
        break;
      case "bears":
        numTeamId = 6;
        break;
      default:
        alert("Invalid team name");
        break;
    }

    setTeamId(numTeamId);
  }, [teamName]);

  useEffect(() => {
    const fetchAndSetPlayers = async () => {
      await fetchPlayers();
    };

    fetchAndSetPlayers();
  }, [teamId, fetchPlayers]);

  if (players === null) {
    return <p>Loading...</p>;
  }

  if (authUser === false) {
    return (
      <section className="background">
        <Header />
        <Nav />
        <p>You must be logged in to view this page</p>
        <Footer />
      </section>
    );
  }

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <TeamHeaderAdmin />
        <AddPlayers teamId={teamId} fetchPlayers={fetchPlayers} />
        <EditPlayers
          players={players}
          teamId={teamId}
          fetchPlayers={fetchPlayers}
        />
      </main>
      <Footer />
    </section>
  );
};

export default ManagePlayers;
