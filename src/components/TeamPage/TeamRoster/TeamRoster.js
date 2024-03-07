import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  getPlayersByTeam,
  getSkaterStatsByTeam,
} from "../../../utils/api-utils";
import {
  handleHeaderClick,
  sortColumn,
} from "../../../utils/sorting-functions.js";
import "./TeamRoster.scss";

const TeamRoster = () => {
  const { teamName } = useParams();

  const [players, setPlayers] = useState(null); // may not need this and all realted functions
  const [skaterStats, setSkaterStats] = useState(null);
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

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        if (teamId !== null) {
          const response = await axios.get(getPlayersByTeam(teamId));
          setPlayers(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchAndSetPlayers = async () => {
      await fetchPlayers();
    };

    fetchAndSetPlayers();
  }, [teamId]);

  useEffect(() => {
    const fetchSkaterStats = async () => {
      try {
        if (teamId !== null) {
          const response = await axios.get(getSkaterStatsByTeam(teamId));
          setSkaterStats(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchAndSetSkaterStats = async () => {
      await fetchSkaterStats();
    };

    fetchAndSetSkaterStats();
  }, [teamId]);

  if (players === null || skaterStats === null) {
    return <p>Loading...</p>;
  }

  const skaterData = players.filter(
    (player) => player.team_id === teamId && player.position !== "G"
  );
  const goalieData = players.filter(
    (player) => player.team_id === teamId && player.position === "G"
  );

  // console.log(sort);
  // console.log(skaterStats);

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
            <th scope="col">Name</th>
            <th scope="col">No.</th>
            <th scope="col">Pos.</th>
            {/* <th scope="col">GP</th>
            <th scope="col">W</th>
            <th scope="col">GAA</th> */}
          </tr>
        </thead>
        <tbody>
          {goalieData.map((player) => (
            <tr className="roster__table-row" key={player.id}>
              <td className="roster__table-name" data-label="Name">
                {player.name}
              </td>
              <td className="roster__table-no" data-label="No.">
                {player.number}
              </td>
              <td className="roster__table-pos" data-label="Pos.">
                {player.position}
              </td>
              {/* <td className="roster__table-stat" data-label="GP">
                {player.games}
              </td>
              <td className="roster__table-stat" data-label="W">
                {player.wins}
              </td>
              <td className="roster__table-stat" data-label="GAA">
                {(player.goalsAgainst / player.games).toFixed(2)}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default TeamRoster;
