import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import PointsLeaders from "../../components/StatLeaders/PointsLeaders/PointsLeaders";
import GoalsLeaders from "../../components/StatLeaders/GoalsLeaders/GoalsLeaders";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
    getAllSkaterStats,
    getAllGoalieStats,
  } from "../../utils/api-utils";
import "./StatLeaders.scss";


const StatLeaders = () => {
  const [skaterStats, setSkaterStats] = useState(null);
  const [goalieStats, setGoalieStats] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      const skaterResponse = await axios.get(getAllSkaterStats());
      setSkaterStats(skaterResponse.data);
      const goalieResponse = await axios.get(getAllGoalieStats());
      setGoalieStats(goalieResponse.data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
      fetchStats();
  }, [fetchStats]);

  console.log(goalieStats);

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="stat-leaders">
        <h1 className="stat-leaders__header">League Leaders</h1>
        <PointsLeaders skaterStats={skaterStats} />
        <GoalsLeaders skaterStats={skaterStats} />
      </main>
      <Footer />
    </section>
  );
};

export default StatLeaders;
