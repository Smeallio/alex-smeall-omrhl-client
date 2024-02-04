import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { deletePlayer } from "../../../utils/api-utils";
import "./EditPlayers.scss";

const EditPlayers = ({ players, fetchPlayers }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

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

  return (
    <article className="editPlayers">
      <h3 className="editPlayers__header">Edit Players</h3>
      <section className="editPlayers__block">
        <table className="editPlayers__table">
          <caption className="editPlayers__table-title">
            Roster & Statistics (Skaters)
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
                <td className="editPlayers__table-box editPlayers__table-box-name">
                  {player.name}
                </td>
                <td className="editPlayers__table-box editPlayers__table-box-number">
                  {player.number}
                </td>
                <td className="editPlayers__table-box editPlayers__table-position">
                  {player.position}
                </td>
                <td className="editPlayers__table-box editPlayers__table-box-edit">
                  <FontAwesomeIcon
                    className="editPlayers__table-box-edit-icon"
                    icon={faPenToSquare}
                  />
                </td>
                <td className="editPlayers__table-box editPlayers__table-box-delete">
                  <FontAwesomeIcon
                    className="editPlayers__table-box-delete-icon"
                    icon={faTrashCan}
                    onClick={() => handleDeletePlayer(player.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
