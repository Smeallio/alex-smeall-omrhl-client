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
import {
  getOneGame,
  getSkaterStatsByGame,
  getGoalieStatsByGame,
  getPlayersByTeam,
} from "../../utils/api-utils";
import "./ManageStats.scss";

const ManageStats = ({ authUser }) => {
  const { gameId } = useParams();

  const [game, setGame] = useState(0);
  const [skaterStats, setSkaterStats] = useState(null);
  const [goalieStats, setGoalieStats] = useState(null);
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

  const fetchStats = useCallback(async () => {
    try {
      const skaterResponse = await axios.get(getSkaterStatsByGame(gameId));
      setSkaterStats(skaterResponse.data);
      const goalieResponse = await axios.get(getGoalieStatsByGame(gameId));
      setGoalieStats(goalieResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [gameId, fetchGame]);

  useEffect(() => {
    if (game) {
      fetchPlayers();
    }
  }, [game, fetchPlayers]);

  useEffect(() => {
    if (gameId) {
        fetchStats();
    }
  }, [gameId, fetchStats])

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

  if (skaterStats === null || goalieStats === null || playersTeamOne === null || playersTeamTwo === null) {
    return <p>Loading...</p>;
  }

  const filterSkaterTeam = (team, skaterStats) => {
    if (team && skaterStats) {
      return skaterStats.filter((skater) => skater.team_id === team);
    }
  };

  const filterGoalieTeam = (team, goalieStats) => {
    if (team && goalieStats) {
      return goalieStats.filter((goalie) => goalie.team_id === team);
    }
  };

  const filterSkaters = players => {
    if (players) {
      return players.filter((player) => player.position !== 'G')
    }
  }

  const filterGoalies = players => {
    if (players) {
      return players.filter((player) => player.position === 'G')
    }
  }

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
            <SkaterStats
              team={game.team1_team_id}
              players={filterSkaters(playersTeamOne)}
              skaterStats={filterSkaterTeam(game.team1_team_id, skaterStats)}
              fetchStats={fetchStats}
            />
            <GoalieStats
              team={game.team1_team_id}
              players={filterGoalies(playersTeamOne)}
              goalieStats={filterGoalieTeam(game.team1_team_id, goalieStats)}
              fetchStats={fetchStats}
            />
          </section>
          <section className="manageStats__team-columns-team">
            <SkaterStats
              team={game.team2_team_id}
              players={filterSkaters(playersTeamTwo)}
              skaterStats={filterSkaterTeam(game.team2_team_id, skaterStats)}
              fetchStats={fetchStats}
            />
            <GoalieStats
              team={game.team2_team_id}
              players={filterGoalies(playersTeamTwo)}
              goalieStats={filterGoalieTeam(game.team2_team_id, goalieStats)}
              fetchStats={fetchStats}
            />
          </section>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default ManageStats;
