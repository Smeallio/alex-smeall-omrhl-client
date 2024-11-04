import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../../utils/api-utils";
import "./Dashboard.scss";

const Dashboard = ({ authUser }) => {
  const [games, setGames] = useState(null);
  const fetchGames = async () => {
    try {
      const response = await axios.get(getGames());
      const allGames = response.data;
      setGames(allGames);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    document.title = "Odd Man Rush Hockey League - Admin Dashboard";
  }, []);

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

  if (games === null) {
    return <p>Loading...</p>;
  }

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <article className="dashboard">
          <h1 className="dashboard__title">Administrator Dashboard</h1>
          <section className="dashboard__flex">
            <section className="dashboard__flex-teams-games">
              <h2 className="dashboard__subtitle">Update Teams</h2>
              <Link className="dashboard__link" to="/admin/dashboard/saints">
                Duck Island Saints
              </Link>
              <Link className="dashboard__link" to="/admin/dashboard/kraken">
                Kraken Beers
              </Link>
              <Link
                className="dashboard__link"
                to="/admin/dashboard/leprechauns"
              >
                Fogtown Leprechauns
              </Link>
              <Link className="dashboard__link" to="/admin/dashboard/moose">
                Mighty Moose
              </Link>
              <Link className="dashboard__link" to="/admin/dashboard/bears">
                Quidi Vidi Bears
              </Link>
              <Link className="dashboard__link" to="/admin/dashboard/liners">
                The Witless Bay Liners
              </Link>
              <h2 className="dashboard__subtitle">Update Games</h2>
              <Link className="dashboard__link" to="/admin/dashboard/games">
                Scores & Schedule
              </Link>
              <h2 className="dashboard__subtitle">Update Announcements</h2>
              <Link
                className="dashboard__link"
                to="/admin/dashboard/announcements"
              >
                Announcements
              </Link>
            </section>
            <section className="dashboard__flex-boxscores">
              <h2 className="dashboard__subtitle">Update Boxscores</h2>
              <ul>
                {games.map((game) => (
                  <li key={game.id}>
                    <Link
                      className="dashboard__link"
                      to={`/admin/dashboard/games/${game.id}`}
                      key={game.id}
                    >{`${game.date} ${game.team1_name} vs. ${game.team2_name}`}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Dashboard;
