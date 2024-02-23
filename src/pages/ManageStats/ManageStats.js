import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import GameDetails from "../../components/Admin/GameDetails/GameDetails";
import SkaterStats from "../../components/Admin/SkaterStats/SkaterStats";
import GoalieStats from "../../components/Admin/GoalieStats/GoalieStats";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getOneGame, getSkaterStats, getPlayersByTeam } from "../../utils/api-utils";
import "./ManageStats.scss";

const ManageStats = ({ authUser }) => {
  const { gameId } = useParams();

  const [game, setGame] = useState(0);
  const [skaterStats, setSkaterStats] = useState(null);
  const [playersTeamOne, setPlayersTeamOne] = useState(null);
  const [playersTeamTwo, setPlayersTeamTwo] = useState(null);

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

  const fetchPlayers = useCallback(async () => {
    try {
      const responseOne = await axios.get(getPlayersByTeam(game.team1_team_id));
      setPlayersTeamOne(responseOne.data);
      const responseTwo = await axios.get(getPlayersByTeam(game.team2_team_id));
      setPlayersTeamTwo(responseTwo.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [game]);

  useEffect(() => {
    const fetchAndSetPlayers = async () => {
      await fetchPlayers();
    };

    fetchAndSetPlayers();
  }, [fetchPlayers]);

  const fetchSkaterStats = useCallback(async () => {
    try {
      const response = await axios.get(getSkaterStats(gameId));
      setSkaterStats(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [gameId]);

  useEffect(() => {
    const fetchAndSetSkaterStats = async () => {
      await fetchSkaterStats();
    };

    fetchAndSetSkaterStats();
  }, [fetchSkaterStats]);

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

  if (skaterStats === null) {
    return <p>Loading...</p>
  }

  const filterSkaterTeam = (team, skaterStats) => {
    if (team && skaterStats) {
      return skaterStats.filter((skater) => skater.team_id === team);
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
          <section className="manageStats__team-columns-team">
            <SkaterStats team={game.team1_team_id} players={playersTeamOne} skaterStats={ filterSkaterTeam(game.team1_team_id, skaterStats) } fetchSkaterStats={fetchSkaterStats} />
            <GoalieStats team={game.team1_team_id} players={playersTeamOne} />
          </section>
          <section className="manageStats__team-columns-team">
            <SkaterStats team={game.team1_team_id} players={playersTeamTwo} skaterStats={ filterSkaterTeam(game.team2_team_id, skaterStats) } fetchSkaterStats={fetchSkaterStats} />
            <GoalieStats team={game.team2_team_id} players={playersTeamTwo} />
          </section>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default ManageStats;
