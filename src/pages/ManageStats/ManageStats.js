import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import GameDetails from "../../components/Admin/GameDetails/GameDetails";
import GameStats from "../../components/Admin/GameStats/GameStats";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getOneGame, getSkaterStats } from "../../utils/api-utils";
import "./ManageStats.scss";

const ManageStats = ({ authUser }) => {
  const { gameId } = useParams();

  const [game, setGame] = useState(null);
  const [skaterStats, setSkaterStats] = useState(null);

  const fetchGame = async () => {
    try {
      const response = await axios.get(getOneGame(gameId));
      setGame(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchSkaterStats = async () => {
    try {
      const response = await axios.get(getSkaterStats(gameId));
      setSkaterStats(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchGame();
    fetchSkaterStats();
  }, [fetchGame, fetchSkaterStats]);

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

  const skaterStatsTeamOne = (game, skaterStats) => {
    if (game !== null) {
      return skaterStats.filter(
        (skater) => skater.team_id === game.team1_team_id
      );
    }
  };

  const skaterStatsTeamTwo = (game, skaterStats) => {
    if (game !== null) {
      return skaterStats.filter(
        (skater) => skater.team_id === game.team2_team_id
      );
    }
  };

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
            skaters={skaterStatsTeamOne(game, skaterStats)}
          />
          <GameStats
            team={game.team2_team_id}
            skaters={skaterStatsTeamTwo(game, skaterStats)}
          />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default ManageStats;
