import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addSkaterStat,
  updateSkaterStat,
  deleteSkaterStat,
} from "../../../utils/api-utils";
import "./SkaterStats.scss";

const SkaterStats = ({ team, players, skaterStats, fetchSkaterStats }) => {

console.log(team);
console.log(players);
console.log(skaterStats);


  const { gameId } = useParams();

  const [newSkaterStat, setNewSkaterStat] = useState({
    player_id: "",
    goals: "",
    assists: "",
  });
  const [editableSkater, setEditableSkater] = useState(0);
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

  const handleDeleteStat = async (skaterStatId) => {
    setConfirmDelete(skaterStatId);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeleteSkaterStat = async () => {
    try {
      await axios.delete(deleteSkaterStat(confirmDelete));
      console.log("Stat deleted successfully");
      fetchSkaterStats();
    } catch (err) {
      console.log("Player delete failed ", err);
    } finally {
      setConfirmDelete(null);
    }
  };

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
      await axios.post(addSkaterStat(gameId), newSkaterStatAdd);
      console.log(addSkaterStat(gameId));
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
    <article className="editSkaterStats">
      <section className="editSkaterStats__block">
        <form className="editSkaterStats__form">
          <table className="editSkaterStats__table">
            <caption className="editSkaterStats__table-title">{`${getTeamById(
              team
            )} Skaters`}</caption>
            <thead className="editSkaterStats__table-headers">
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
              {skaterStats.map((skater) => (
                <tr className="editSkaterStats__table-row" key={skater.id}>
                  {editableSkater.id === skater.id ? (
                    <>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-name">
                        <select
                          name="player_id"
                          value={editableSkater.player_id}
                          onChange={handleEditInputChange}
                        >
                          {players.map((player) => (
                            <option key={player.id} value={player.id}>
                              {player.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-goals">
                        <input
                          type="number"
                          name="goals"
                          value={editableSkater.goals}
                          onChange={handleEditInputChange}
                        />
                      </td>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-assists">
                        <input
                          type="number"
                          name="assists"
                          value={editableSkater.assists}
                          onChange={handleEditInputChange}
                        />
                      </td>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-check">
                        <FontAwesomeIcon
                          className="editSkaterStats__table-box-check-icon"
                          icon={faCheck}
                          onClick={confirmEditSkater}
                        />
                      </td>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-x">
                        <FontAwesomeIcon
                          className="editSkaterStats__table-box-x-icon"
                          icon={faXmark}
                          onClick={cancelEdit}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-name">
                        {skater.player_name}
                      </td>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-goals">
                        {skater.goals}
                      </td>
                      <td className="editSkaterStats__table-box editSkaterStats__table-box-assists">
                        {skater.assists}
                      </td>
                      <td className="editSkaterStats__table-box editPlayers__table-box-edit">
                        <FontAwesomeIcon
                          className="editSkaterStats__table-box-edit-icon"
                          icon={faPenToSquare}
                          onClick={() => handleEditClick(skater)}
                        />
                      </td>
                      <td className="editSkaterStats__table-box editPlayers__table-box-delete">
                        <FontAwesomeIcon
                          className="editSkaterStats__table-box-delete-icon"
                          icon={faTrashCan}
                          onClick={() => handleDeleteStat(skater.id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
            {showAddStat && (
              <tfoot>
                <tr className="editSkaterStats__table-row">
                  <td className="editSkaterStats__table-box editSkaterStats__table-box-name">
                    <select
                      name="player_id"
                      value={newSkaterStat.player_id}
                      onChange={handleAddInputChange}
                    >
                      {players.map((player) => (
                        <option key={player.id} value={player.id}>
                          {player.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="editSkaterStats__table-box editSkaterStats__table-box-goals">
                    <input
                      type="number"
                      name="goals"
                      value={newSkaterStat.goals}
                      onChange={handleAddInputChange}
                    />
                  </td>
                  <td className="editSkaterStats__table-box editSkaterStats__table-box-assists">
                    <input
                      type="number"
                      name="assists"
                      value={newSkaterStat.assists}
                      onChange={handleAddInputChange}
                    />
                  </td>
                  <td className="editSkaterStats__table-box editSkaterStats__table-box-check">
                    <FontAwesomeIcon
                      className="editSkaterStats__table-box-check-icon"
                      icon={faCheck}
                      onClick={confirmAddSkaterStat}
                    />
                  </td>
                  <td className="editSkaterStats__table-box editSkaterStats__table-box-x">
                    <FontAwesomeIcon
                      className="editSkaterStats__table-box-x-icon"
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
      <button className="editSkaterStats__button" onClick={handleAddStatClick}>
        Add Statline
      </button>
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this player? You will not be able to undo this."
          cancel={cancelDelete}
          confirm={confirmDeleteSkaterStat}
        />
      )}
    </article>
  );
};

export default SkaterStats;
