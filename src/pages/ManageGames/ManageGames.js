import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import AddGames from "../../components/Admin/AddGames/AddGames";
import EditGames from "../../components/Admin/EditGames/EditGames";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { getGames } from "../../utils/api-utils";
import "./ManageGames.scss";



const ManageGames = ({ authUser }) => {
  const [games, setGames] = useState(null);

  const fetchGames = async () => {
    try {
        const response = await axios.get(getGames());
        const allGames = response.data;
        setGames(allGames)
    } catch (err) {
        console.log(err.message);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  const getIdByTeam = (teamName) => {
    switch (teamName) {
      case "Fogtown Leprechauns":
        return 1;
      case "Duck Island Saints":
        return 2;
      case "Mighty Moose":
        return 3;
      case "Kraken Beers":
        return 4;
      default:
        return null;
    }
  };

  console.log(games);

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
        <AddGames fetchGames={fetchGames} getIdByTeam={getIdByTeam} />
        <EditGames games={games} fetchGames={fetchGames} getIdByTeam={getIdByTeam} />
      </main>
      <Footer />
    </section>
  );
};

export default ManageGames;
