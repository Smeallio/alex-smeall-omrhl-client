import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState } from "react";
import { deletePlayer, updatePlayer } from "../../../utils/api-utils";
import "./EditPlayers.scss";

const EditPlayers = ({ players, teamId, fetchPlayers }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editablePlayer, setEditablePlayer] = useState(0);

  const handleDeletePlayer = async (playerId) => {
    setConfirmDelete(playerId);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeletePlayer = async () => {
    try {
      await axios.delete(deletePlayer(confirmDelete));
      console.log("Played deleted successfully");
      fetchPlayers();
    } catch (err) {
      console.log("Player delete failed ", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEditClick = (player) => {
    console.log("Edit clicked: ", player);
    setEditablePlayer({ ...player });
  };

  const cancelEdit = () => {
    setEditablePlayer(0);
  };

  const confirmEditPlayer = async (event) => {
    event.preventDefault();
    const updatedPlayer = {
      name: editablePlayer.name,
      team_id: teamId,
      position: editablePlayer.position,
      number: editablePlayer.number || undefined,
    };
    try {
      await axios.put(updatePlayer(editablePlayer.id), updatedPlayer);
      fetchPlayers();
    } catch (err) {
      console.log("Error updating player: ", err);
    }
    setEditablePlayer(0);
  };

  const handleInputChange = (event) => {
    setEditablePlayer((prevEditablePlayer) => ({
      ...prevEditablePlayer,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <article className="editPlayers">
      <h3 className="editPlayers__header">Edit Players</h3>
      <section className="editPlayers__block">
        <form className="editPlayers__form" onSubmit={confirmEditPlayer}>
          <table className="editPlayers__table">
            <caption className="editPlayers__table-title">
              Current Roster
            </caption>
            <thead className="editPlayers__table-headers">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">No.</th>
                <th scope="col">Pos.</th>
                <th scope="col" colSpan="2">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr className="editPlayers__table-row" key={player.id}>
                  {editablePlayer.id === player.id ? (
                    <>
                      <td className="editPlayers__table-box editPlayers__table-name">
                        <input
                          type="text"
                          name="name"
                          value={editablePlayer.name}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-number">
                        <input
                          type="number"
                          name="number"
                          value={editablePlayer.number == 0 ? "" : editablePlayer.number}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-position">
                        <select
                          name="position"
                          value={editablePlayer.position}
                          onChange={handleInputChange}
                        >
                          <option value="F">F</option>
                          <option value="D">D</option>
                          <option value="G">G</option>
                        </select>
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-box-check">
                        <FontAwesomeIcon
                          className="editPlayers__table-box-check-icon"
                          icon={faCheck}
                          onClick={confirmEditPlayer}
                        />
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-box-x">
                        <FontAwesomeIcon
                          className="editPlayers__table-box-x-icon"
                          icon={faXmark}
                          onClick={cancelEdit}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="editPlayers__table-box editPlayers__table-box-name">
                        {player.name}
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-box-number">
                        {player.number == 0 ? "" : player.number}
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-position">
                        {player.position}
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-box-edit">
                        <FontAwesomeIcon
                          className="editPlayers__table-box-edit-icon"
                          icon={faPenToSquare}
                          onClick={() => handleEditClick(player)}
                        />
                      </td>
                      <td className="editPlayers__table-box editPlayers__table-box-delete">
                        <FontAwesomeIcon
                          className="editPlayers__table-box-delete-icon"
                          icon={faTrashCan}
                          onClick={() => handleDeletePlayer(player.id)}
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </section>
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this player? You will not be able to undo this."
          cancel={cancelDelete}
          confirm={confirmDeletePlayer}
        />
      )}
    </article>
  );
};

export default EditPlayers;
