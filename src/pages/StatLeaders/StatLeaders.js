import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import PointsLeaders from "../../components/StatLeaders/PointsLeaders/PointsLeaders";
import GoalsLeaders from "../../components/StatLeaders/GoalsLeaders/GoalsLeaders";
import AssistsLeaders from "../../components/StatLeaders/AssistsLeaders/AssistsLeaders";
import GoalieWins from "../../components/StatLeaders/GoalieWins/GoalieWins";
import GoalieGoalsAgainst from "../../components/StatLeaders/GoalieGoalsAgainst/GoalieGoalsAgainst";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
  getAllSkaterStats,
  getAllPlayoffSkaterStats,
  getAllGoalieStats,
  getAllPlayoffGoalieStats,
} from "../../utils/api-utils";
import "./StatLeaders.scss";

const StatLeaders = () => {
  const [skaterStats, setSkaterStats] = useState(null);
  const [goalieStats, setGoalieStats] = useState(null);
  const [seasonType, setSeasonType] = useState("regular");

  useEffect(() => {
    document.title = "Odd Man Rush Hockey League - League Leaders";
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      let skaterResponse, goalieResponse;
      if (seasonType === "regular") {
        skaterResponse = await axios.get(getAllSkaterStats());
        goalieResponse = await axios.get(getAllGoalieStats());
      } else if (seasonType === "playoffs") {
        skaterResponse = await axios.get(getAllPlayoffSkaterStats());
        goalieResponse = await axios.get(getAllPlayoffGoalieStats());
      }
      setSkaterStats(skaterResponse.data);
      setGoalieStats(goalieResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [seasonType]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const toggleSeasonType = (type) => {
    setSeasonType(type);
  };

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="stat-leaders">
        {seasonType === "regular" && (
          <section className="stat-leaders__header">
            <h1 className="stat-leaders__header-text">
              Regular Season League Leaders
            </h1>
            <button
              className="stat-leaders__header-button"
              onClick={() => toggleSeasonType("playoffs")}
            >
              View Playoff Stats
            </button>
          </section>
        )}
        {seasonType === "playoffs" && (
          <section className="stat-leaders__header">
            <h1 className="stat-leaders__header-text">
              Playoff League Leaders
            </h1>
            <button
              className="stat-leaders__header-button"
              onClick={() => toggleSeasonType("regular")}
            >
              View Regular Season Stats
            </button>
          </section>
        )}
        <section className="stat-leaders__container">
          <h2 className="stat-leaders__subheader">Skaters</h2>
          <PointsLeaders skaterStats={skaterStats} />
          <GoalsLeaders skaterStats={skaterStats} />
          <AssistsLeaders skaterStats={skaterStats} />
          <h2 className="stat-leaders__subheader">Goalies</h2>
          <GoalieWins goalieStats={goalieStats} />
          <GoalieGoalsAgainst goalieStats={goalieStats} />
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default StatLeaders;
