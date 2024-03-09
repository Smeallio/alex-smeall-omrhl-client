import saintsLogo from "../../assets/images/logos/Duck-Island-Saints-vector.png";
import krakenLogo from "../../assets/images/logos/Kraken-Beers-vector.png";
import lepLogo from "../../assets/images/logos/Leprechauns-vector.png";
import mooseLogo from "../../assets/images/logos/Moose-vector.png";
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

  const getLogoByName = (teamName) => {
    if (teamName === "Fogtown Leprechauns") {
      return lepLogo;
    } else if (teamName === "Duck Island Saints") {
      return saintsLogo;
    } else if (teamName === "Mighty Moose") {
      return mooseLogo;
    } else if (teamName === "Kraken Beers") {
      return krakenLogo;
    }
  };

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="boxscore">
        <TeamHeader />
        <section className="boxscore__game-info">
          <GameDetailsHeader game={game} getLogoByName={getLogoByName} />
        </section>
        <section className="boxscore__teams">
          <section className="boxscore__teams-column">
            <section className="boxscore__teams-column-header">
              <img
                className="boxscore__teams-column-logo"
                src={getLogoByName(game.team1_name)}
                alt={game.team1_name}
              />
              <h3 className="boxscore__teams-column-teamname">
                {game.team1_name}
              </h3>
            </section>
            <Skaters
              skaterStats={filterSkaterTeam(game.team1_team_id, skaterStats)}
            />
            <Goalies
              goalieStats={filterGoalieTeam(game.team1_team_id, goalieStats)}
            />
          </section>
          <section className="boxscore__teams-column">
            <section className="boxscore__teams-column-header">
              <img
                className="boxscore__teams-column-logo"
                src={getLogoByName(game.team2_name)}
                alt={game.team2_name}
              />
              <h3 className="boxscore__teams-column-teamname">
                {game.team2_name}
              </h3>
            </section>
            <Skaters
              skaterStats={filterSkaterTeam(game.team2_team_id, skaterStats)}
            />
            <Goalies
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
