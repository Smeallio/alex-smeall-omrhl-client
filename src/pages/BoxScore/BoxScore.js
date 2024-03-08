import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeader from "../../components/TeamPage/TeamHeader/TeamHeader";
import GameDetailsHeader from "../../components/BoxScore/GameDetailsHeader/GameDetailsHeader";
import Skaters from "../../components/BoxScore/Skaters/Skaters";
import Goalies from "../../components/BoxScore/Goalies/Goalies";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  getOneGame,
  getSkaterStats,
  getGoalieStats,
} from "../../utils/api-utils";
import "./BoxScore.scss";

const BoxScore = () => {
  const { gameId } = useParams();

  const [game, setGame] = useState(null);
  const [skaterStats, setSkaterStats] = useState(null);
  const [goalieStats, setGoalieStats] = useState(null);

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

  const fetchStats = useCallback(async () => {
    try {
      const skaterResponse = await axios.get(getSkaterStats(gameId));
      setSkaterStats(skaterResponse.data);
      const goalieResponse = await axios.get(getGoalieStats(gameId));
      setGoalieStats(goalieResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [gameId]);

  useEffect(() => {
    if (gameId) {
      fetchStats();
    }
  }, [gameId, fetchStats]);

  if (game === null || skaterStats === null || goalieStats === null) {
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

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="boxscore">
        <TeamHeader />
        <section className="boxscore__game-info">
          <GameDetailsHeader game={game} />
        </section>
        <section className="boxscore__teams">
          <section className="boxscore__teams-column">
            <Skaters
              team={game.team1_name}
              skaterStats={filterSkaterTeam(game.team1_team_id, skaterStats)}
            />
            <Goalies
              team={game.team1_name}
              goalieStats={filterGoalieTeam(game.team1_team_id, goalieStats)}
            />
          </section>
          <section className="boxscore__teams-column">
            <Skaters
              team={game.team2_name}
              skaterStats={filterSkaterTeam(game.team2_team_id, skaterStats)}
            />
            <Goalies
              team={game.team2_name}
              goalieStats={filterGoalieTeam(game.team2_team_id, goalieStats)}
            />
          </section>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default BoxScore;
