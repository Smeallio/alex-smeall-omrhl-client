// import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  getSkaterStats,
  getPlayersByTeam,
  addSkaterStat,
  updateSkaterStat,
} from "../../../utils/api-utils";
import "./SkaterStats.scss";

const SkaterStats = ({ team }) => {
  const { gameId } = useParams();

  const [skaterStats, setSkaterStats] = useState(null);
  const [newSkaterStat, setNewSkaterStat] = useState({
    player_id: "",
    goals: "",
    assists: "",
  });
  const [players, setPlayers] = useState(null);
  const [editableSkater, setEditableSkater] = useState(0);
  // const [confirmDelete, setConfirmDelete] = useState(null);
  const [showAddStat, setShowAddStat] = useState(false);

  const getTeamById = (teamId) => {
    switch (teamId) {
      case 1:
        return "Fogtown Leprechauns";
      case 2:
        return "Duck Island Saints";
      case 3:
        return "Mighty Moose";
      case 4:
        return "Kraken Beers";
      default:
        return null;
    }
  };

  const fetchPlayers = useCallback(async () => {
    try {
      const response = await axios.get(getPlayersByTeam(team));
      setPlayers(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [team]);

  useEffect(() => {
    const fetchAndSetPlayers = async () => {
      await fetchPlayers();
    };

    fetchAndSetPlayers();
  }, [team, fetchPlayers]);

  const fetchSkaterStats = useCallback(async () => {
    try {
      const response = await axios.get(getSkaterStats(gameId));
      setSkaterStats(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [gameId]);

  useEffect(() => {
    // const fetchAndSetSkaterStats = async () => {
    //   await fetchSkaterStats();
    // };

    // fetchAndSetSkaterStats();
    fetchSkaterStats();
  }, [gameId, fetchSkaterStats]);

  if (skaterStats === null) {
    return <p>Loading...</p>;
  }

  const filterSkaterTeam = (team, skaterStats) => {
    if (team && skaterStats) {
      return skaterStats.filter((skater) => skater.team_id === team);
    }
  };

  //   const handleDeleteStat = async (skaterId) => {
  //     setConfirmDelete(skaterId);
  //   };

  //   const cancelDelete = () => {
  //     setConfirmDelete(null);
  //   };

  // Delete API call

  const handleEditClick = (skater) => {
    console.log("Edit clicked: ", skater);
    setEditableSkater({ ...skater });
  };

  const cancelEdit = () => {
    setEditableSkater(0);
  };

  const confirmEditSkater = async (event) => {
    event.preventDefault();
    const updatedSkaterStat = {
      player_id: editableSkater.player_id,
      team_id: team,
      goals: editableSkater.goals,
      assists: editableSkater.assists,
    };
    console.log(updatedSkaterStat);
    try {
      await axios.put(updateSkaterStat(editableSkater.id), updatedSkaterStat);
      fetchSkaterStats();
    } catch (err) {
      console.log("Error updating player: ", err);
    }
    setEditableSkater(0);
  };

  const handleEditInputChange = (event) => {
    setEditableSkater((prevEditableSkater) => ({
      ...prevEditableSkater,
      [event.target.name]: event.target.value,
    }));
  };

  if (players === null) {
    return <p>Loading...</p>;
  }

  const getPlayerNameById = (playerId) => {
    const player = players.find((player) => player.id === playerId);
    if (player) {
      return player.name;
    } else {
      return "Player not found";
    }
  };

  const handleAddStatClick = () => {
    setShowAddStat(true);
  };

  const cancelAddSkaterStat = () => {
    setShowAddStat(false);
  };

  const confirmAddSkaterStat = async (event) => {
    event.preventDefault();
    const newSkaterStatAdd = {
      player_id: newSkaterStat.player_id,
      team_id: team,
      goals: newSkaterStat.goals,
      assists: newSkaterStat.assists,
    };
    console.log(newSkaterStatAdd);
    try {
      await axios.put(addSkaterStat(gameId), newSkaterStatAdd);
      fetchSkaterStats();
      setNewSkaterStat({
        player_id: "",
        goals: "",
        assists: "",
      });
    } catch (err) {
      console.log("Error updating player: ", err);
    }
    setEditableSkater(0);
  };

  const handleAddInputChange = (event) => {
    setNewSkaterStat((prevNewSkater) => ({
      ...prevNewSkater,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <article className="editStats">
      <section className="editStats__block">
        <form className="editStats__form">
          <table className="editStats__table">
            <caption className="editStats__table-title">{`${getTeamById(
              team
            )} Skaters`}</caption>
            <thead className="editStats__table-headers">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Goals</th>
                <th scope="col">Assists</th>
                <th scope="col" colSpan="2">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {filterSkaterTeam(team, skaterStats).map((skater) => (
                <tr className="editStats__table-row" key={skater.id}>
                  {editableSkater.id === skater.id ? (
                    <>
                      <td className="editStats__table-box editStats__table-box-name">
                        <select
                          name="player_id"
                          value={editableSkater.player_id}
                          onChange={handleEditInputChange}
                        >
                          {players.map((player) => (
                            <option key={player.id} value={player.id}>
                              {getPlayerNameById(player.id)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="editStats__table-box editStats__table-box-goals">
                        <input
                          type="number"
                          name="goals"
                          value={editableSkater.goals}
                          onChange={handleEditInputChange}
                        />
                      </td>
                      <td className="editStats__table-box editStats__table-box-assists">
                        <input
                          type="number"
                          name="assists"
                          value={editableSkater.assists}
                          onChange={handleEditInputChange}
                        />
                      </td>
                      <td className="editStats__table-box editStats__table-box-check">
                        <FontAwesomeIcon
                          className="editStats__table-box-check-icon"
                          icon={faCheck}
                          onClick={confirmEditSkater}
                        />
                      </td>
                      <td className="editStats__table-box editStats__table-box-x">
                        <FontAwesomeIcon
                          className="editStats__table-box-x-icon"
                          icon={faXmark}
                          onClick={cancelEdit}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="editStats__table-box editStats__table-box-name">
                        {skater.player_name}
                      </td>
                      <td className="editStats__table-box editStats__table-box-goals">
                        {skater.goals}
                      </td>
                      <td className="editStats__table-box editStats__table-box-assists">
                        {skater.assists}
                      </td>
                      <td className="editStats__table-box editPlayers__table-box-edit">
                        <FontAwesomeIcon
                          className="editStats__table-box-edit-icon"
                          icon={faPenToSquare}
                          onClick={() => handleEditClick(skater)}
                        />
                      </td>
                      <td className="editStats__table-box editPlayers__table-box-delete">
                        <FontAwesomeIcon
                          className="editStats__table-box-delete-icon"
                          icon={faTrashCan}
                          //   onClick={() => handleDeleteStat(skater)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
            {showAddStat && (
              <tfoot>
                <tr className="editStats__table-row">
                  <td className="editStats__table-box editStats__table-box-name">
                    <select
                      name="player_id"
                      value={newSkaterStat.player_id}
                      onChange={handleAddInputChange}
                    >
                      {players.map((player) => (
                        <option key={player.id} value={player.id}>
                          {getPlayerNameById(player.id)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="editStats__table-box editStats__table-box-goals">
                    <input
                      type="number"
                      name="goals"
                      value={newSkaterStat.goals}
                      onChange={handleAddInputChange}
                    />
                  </td>
                  <td className="editStats__table-box editStats__table-box-assists">
                    <input
                      type="number"
                      name="assists"
                      value={newSkaterStat.assists}
                      onChange={handleAddInputChange}
                    />
                  </td>
                  <td className="editStats__table-box editStats__table-box-check">
                    <FontAwesomeIcon
                      className="editStats__table-box-check-icon"
                      icon={faCheck}
                      onClick={confirmAddSkaterStat}
                    />
                  </td>
                  <td className="editStats__table-box editStats__table-box-x">
                    <FontAwesomeIcon
                      className="editStats__table-box-x-icon"
                      icon={faXmark}
                      onClick={cancelAddSkaterStat}
                    />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </form>
      </section>
      <button className="editStats__button" onClick={handleAddStatClick}>
        Add Statline
      </button>
    </article>
  );
};

export default SkaterStats;
