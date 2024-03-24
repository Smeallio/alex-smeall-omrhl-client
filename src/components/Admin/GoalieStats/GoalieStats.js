import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addGoalieStat,
  updateGoalieStat,
  deleteGoalieStat,
} from "../../../utils/api-utils";
import "./GoalieStats.scss";

const GoalieStats = ({ team, players, goalieStats, fetchStats }) => {
  const { gameId } = useParams();

  const [newGoalieStat, setNewGoalieStat] = useState({
    player_id: "",
    wins: "",
    goalsAgainst: "",
  });
  const [editableGoalie, setEditableGoalie] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
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

  const handleDeleteStat = async (goalieStatId) => {
    setConfirmDelete(goalieStatId);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeleteGoalieStat = async () => {
    try {
      await axios.delete(deleteGoalieStat(confirmDelete));
      console.log("Stat deleted successfully");
      fetchStats();
    } catch (err) {
      console.log("Player delete failed ", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEditClick = (goalie) => {
    setEditableGoalie({ ...goalie });
  };

  const cancelEdit = () => {
    setEditableGoalie(0);
  };

  const confirmEditSkater = async (event) => {
    event.preventDefault();
    const updatedSkaterStat = {
      player_id: editableGoalie.player_id,
      team_id: team,
      wins: editableGoalie.wins,
      goalsAgainst: editableGoalie.goalsAgainst,
    };
    try {
      await axios.put(updateGoalieStat(editableGoalie.id), updatedSkaterStat);
      fetchStats();
    } catch (err) {
      console.log("Error updating player: ", err);
    }
    setEditableGoalie(0);
  };

  const handleEditInputChange = (event) => {
    setEditableGoalie((prevEditableGoalie) => ({
      ...prevEditableGoalie,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddStatClick = () => {
    setShowAddStat(true);
  };

  const cancelAddGoalieStat = () => {
    setNewGoalieStat({
      player_id: "",
      wins: "",
      goalsAgainst: "",
    });
    setShowAddStat(false);
  };

  const confirmAddGoalieStat = async (event) => {
    event.preventDefault();
    const newGoalieStatAdd = {
      player_id: newGoalieStat.player_id,
      team_id: team,
      wins: newGoalieStat.wins,
      goalsAgainst: newGoalieStat.goalsAgainst,
    };
    try {
      await axios.post(addGoalieStat(gameId), newGoalieStatAdd);
      fetchStats();
      setNewGoalieStat({
        player_id: "",
        wins: "",
        goalsAgainst: "",
      });
      if (goalieStats.length >= 0) {
        setShowAddStat(false);
      }
    } catch (err) {
      console.log("Error updating player: ", err);
    }
  };

  const handleAddInputChange = (event) => {
    setNewGoalieStat((prevNewGoalie) => ({
      ...prevNewGoalie,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <article className="editGoalieStats">
      <section className="editGoalieStats__block">
        <form className="editGoalieStats__form">
          <table className="editGoalieStats__table">
            <caption className="editGoalieStats__table-title">{`${getTeamById(
              team
            )} Goalie`}</caption>
            <thead className="editGoalieStats__table-headers">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Win?</th>
                <th scope="col">Goals Against</th>
                <th scope="col" colSpan="2">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {goalieStats.map((goalie) => (
                <tr className="editGoalieStats__table-row" key={goalie.id}>
                  {editableGoalie.id === goalie.id ? (
                    <>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-name">
                        <select
                          name="player_id"
                          value={editableGoalie.player_id}
                          onChange={handleEditInputChange}
                        >
                          {players.map((player) => (
                            <option key={player.id} value={player.id}>
                              {player.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-wins">
                        <input
                          type="number"
                          name="wins"
                          value={editableGoalie.wins}
                          onChange={handleEditInputChange}
                        />
                      </td>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-goalsAgainst">
                        <input
                          type="number"
                          name="goalsAgainst"
                          value={editableGoalie.goalsAgainst}
                          onChange={handleEditInputChange}
                        />
                      </td>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-check">
                        <FontAwesomeIcon
                          className="editGoalieStats__table-box-check-icon"
                          icon={faCheck}
                          onClick={confirmEditSkater}
                        />
                      </td>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-x">
                        <FontAwesomeIcon
                          className="editGoalieStats__table-box-x-icon"
                          icon={faXmark}
                          onClick={cancelEdit}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-name">
                        {goalie.player_name}
                      </td>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-wins">
                        {goalie.wins}
                      </td>
                      <td className="editGoalieStats__table-box editGoalieStats__table-box-goalsagainst">
                        {goalie.goalsAgainst}
                      </td>
                      <td className="editGoalieStats__table-box editPlayers__table-box-edit">
                        <FontAwesomeIcon
                          className="editGoalieStats__table-box-edit-icon"
                          icon={faPenToSquare}
                          onClick={() => handleEditClick(goalie)}
                        />
                      </td>
                      <td className="editGoalieStats__table-box editPlayers__table-box-delete">
                        <FontAwesomeIcon
                          className="editGoalieStats__table-box-delete-icon"
                          icon={faTrashCan}
                          onClick={() => handleDeleteStat(goalie.id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
            {showAddStat && (
              <tfoot>
                <tr className="editGoalieStats__table-row">
                  <td className="editGoalieStats__table-box editGoalieStats__table-box-name">
                    <select
                      name="player_id"
                      value={newGoalieStat.player_id}
                      onChange={handleAddInputChange}
                    >
                      <option value="0">Select goalie...</option>
                      {players.map((player) => (
                        <option key={player.id} value={player.id}>
                          {player.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="editGoalieStats__table-box editGoalieStats__table-box-wins">
                    <input
                      type="number"
                      name="wins"
                      value={newGoalieStat.wins}
                      onChange={handleAddInputChange}
                    />
                  </td>
                  <td className="editGoalieStats__table-box editGoalieStats__table-box-goalsAgainst">
                    <input
                      type="number"
                      name="goalsAgainst"
                      value={newGoalieStat.goalsAgainst}
                      onChange={handleAddInputChange}
                    />
                  </td>
                  <td className="editGoalieStats__table-box editGoalieStats__table-box-check">
                    <FontAwesomeIcon
                      className="editGoalieStats__table-box-check-icon"
                      icon={faCheck}
                      onClick={confirmAddGoalieStat}
                    />
                  </td>
                  <td className="editGoalieStats__table-box editGoalieStats__table-box-x">
                    <FontAwesomeIcon
                      className="editGoalieStats__table-box-x-icon"
                      icon={faXmark}
                      onClick={cancelAddGoalieStat}
                    />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </form>
      </section>
      {goalieStats.length < 1 && (
        <button
          className="editSkaterStats__button"
          onClick={handleAddStatClick}
        >
          Add Goalie Statline
        </button>
      )}
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this player? You will not be able to undo this."
          cancel={cancelDelete}
          confirm={confirmDeleteGoalieStat}
        />
      )}
    </article>
  );
};

export default GoalieStats;
