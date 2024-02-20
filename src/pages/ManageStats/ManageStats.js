import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import GameDetails from "../../components/Admin/GameDetails/GameDetails";
import GameStats from "../../components/Admin/GameStats/GameStats";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getOneGame } from "../../utils/api-utils";
import "./ManageStats.scss";

const ManageStats = ({ authUser }) => {
  const { gameId } = useParams();

  const [game, setGame] = useState(null);

  const fetchGame = useCallback(async () => {
    try {
      const response = await axios.get(getOneGame(gameId));
      setGame(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [gameId, fetchGame]);

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

  if (game === null) {
    return (
      <section className="background">
        <Header />
        <Nav />
        <p>Loading...</p>
        <Footer />
      </section>
    );
  }

  console.log(game);

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <section className="manageStats__header">
          <Link className="manageStats__return-link" to="/admin/dashboard/">
            <FontAwesomeIcon
              className="manageStats__return-link-back-icon"
              icon={faArrowLeft}
            />
            <h1 className="manageStats__return-link-text">
              Return to Dashboard
            </h1>
          </Link>
        </section>
        <GameDetails game={game} />
        <section className="manageStats__team-columns">
          <GameStats
            team={game.team1_team_id}
          />
          <GameStats
            team={game.team2_team_id}
          />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default ManageStats;
