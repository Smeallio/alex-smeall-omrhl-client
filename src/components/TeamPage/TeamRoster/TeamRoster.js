import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {
  getSkaterStatsByTeam,
  getGoalieStatsByTeam,
  getPlayoffSkaterStatsByTeam,
  getPlayoffGoalieStatsByTeam
} from "../../../utils/api-utils";
import {
  handleHeaderClick,
  sortColumn,
} from "../../../utils/sorting-functions.js";
import "./TeamRoster.scss";

const TeamRoster = ( {seasonType} ) => {
  const { teamName } = useParams();

  const [skaterStats, setSkaterStats] = useState(null);
  const [goalieStats, setGoalieStats] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [sort, setSort] = useState({
    keyToSort: "total_points",
    direction: "desc",
  });

  useEffect(() => {
    let numTeamId;

    switch (teamName) {
      case "leprechauns":
        numTeamId = 1;
        break;
      case "saints":
        numTeamId = 2;
        break;
      case "moose":
        numTeamId = 3;
        break;
      case "kraken":
        numTeamId = 4;
        break;
      default:
        alert("Invalid team name");
        break;
    }

    setTeamId(numTeamId);
  }, [teamName]);

  const fetchStats = useCallback(async () => {
    try {
      if (teamId !== null) {
      let skaterResponse, goalieResponse;
      if (seasonType === "regular") {
        skaterResponse = await axios.get(getSkaterStatsByTeam(teamId));
        goalieResponse = await axios.get(getGoalieStatsByTeam(teamId));
      } else if (seasonType === "playoffs") {
        skaterResponse = await axios.get(getPlayoffSkaterStatsByTeam(teamId));
        goalieResponse = await axios.get(getPlayoffGoalieStatsByTeam(teamId));
      }
      setSkaterStats(skaterResponse.data);
      setGoalieStats(goalieResponse.data);
    }
    } catch (err) {
      console.log(err.message);
    }
  }, [seasonType, teamId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, seasonType]);

  if (skaterStats === null || goalieStats === null) {
    return <p>Loading...</p>;
  }

  const handleHeaderClickWrapper = header => {
    handleHeaderClick(header, sort, setSort);
  };

  const sortColumnWrapper = stats => {
    return sortColumn(stats, sort);
  }

  return (
    <article className="roster">
      <table className="roster__table">
        <caption className="roster__table-title">
          Roster & Statistics (Skaters)
        </caption>
        <thead className="roster__table-headers">
          <tr>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_name")}>
              Name
            </th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_number")}>
              No.
            </th>
            <th
              scope="col"
              onClick={() => handleHeaderClickWrapper("player_position")}
            >
              Pos.
            </th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("games_played")}>
              GP
            </th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_goals")}>
              G
            </th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_assists")}>
              A
            </th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_points")}>
              P
            </th>
          </tr>
        </thead>
        <tbody>
          {sortColumnWrapper(skaterStats).map((player) => (
            <tr className="roster__table-row" key={player.player_id}>
              <td className="roster__table-name" data-label="Name">
                {player.player_name}
              </td>
              <td className="roster__table-no" data-label="No.">
                {player.player_number === 0 ? "" : player.player_number}
              </td>
              <td className="roster__table-pos" data-label="Pos.">
                {player.player_position}
              </td>
              <td className="roster__table-stat" data-label="GP">
                {player.games_played}
              </td>
              <td className="roster__table-stat" data-label="G">
                {player.total_goals}
              </td>
              <td className="roster__table-stat" data-label="A">
                {player.total_assists}
              </td>
              <td className="roster__table-stat" data-label="P">
                {player.total_points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="roster__table">
        <caption className="roster__table-title">
          Roster & Statistics (Goalies)
        </caption>
        <thead className="roster__table-headers">
          <tr>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_name")}>Name</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_number")}>No.</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("player_position")}>Pos.</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("games_played")}>GP</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_wins")}>W</th>
            <th scope="col" onClick={() => handleHeaderClickWrapper("total_goalsAgainst")}>GAA</th>
          </tr>
        </thead>
        <tbody>
          {sortColumnWrapper(goalieStats).map((player) => (
            <tr className="roster__table-row" key={player.player_id}>
              <td className="roster__table-name" data-label="Name">
                {player.player_name}
              </td>
              <td className="roster__table-no" data-label="No.">
                {player.player_number === 0 ? "" : player.player_number}
              </td>
              <td className="roster__table-pos" data-label="Pos.">
                {player.player_position}
              </td>
              <td className="roster__table-stat" data-label="GP">
                {player.games_played}
              </td>
              <td className="roster__table-stat" data-label="W">
                {player.total_wins}
              </td>
              <td className="roster__table-stat" data-label="GAA">
                {(player.total_goalsAgainst / player.games_played).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default TeamRoster;
