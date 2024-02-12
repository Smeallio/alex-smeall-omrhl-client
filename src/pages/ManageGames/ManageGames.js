import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeaderAdmin from "../../components/Admin/TeamHeaderAdmin/TeamHeaderAdmin";
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
        <EditGames games={games} fetchGames={fetchGames} />
      </main>
      <Footer />
    </section>
  );
};

export default ManageGames;
