// import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateSkaterStat } from "../../../utils/api-utils";
import "./GameStats.scss";

const GameStats = ({ team, skaters, fetchSkaterStats }) => {
  const { gameId } = useParams();

  // const [confirmDelete, setConfirmDelete] = useState(null);
  const [editableSkater, setEditableSkater] = useState(0);

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
      team_id: editableSkater.team_id,
      game_id: gameId,
      goals: editableSkater.goals,
      assists: editableSkater.assits
    };
    try {
      await axios.put(updateSkaterStat(editableSkater.id), updatedSkaterStat);
      fetchSkaterStats();
    } catch (err) {
      console.log("Error updating player: ", err);
    }
    setEditableSkater(0);
  };

  const handleInputChange = (event) => {
    setEditableSkater((prevEditableSkater) => ({
      ...prevEditableSkater,
      [event.target.name]: event.target.value,
    }));
  };

  console.log(skaters);

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
              {skaters.map((skater) => (
                <tr className="editStats__table-row" key={skater.id}>
                  {editableSkater.id === skater.id ? (
                    <>
                      <td className="editStats__table-box editStats__table-box-name">
                        <input
                          type="text"
                          name="player_name"
                          value={editableSkater.player_name}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="editStats__table-box editStats__table-box-goals">
                        <input
                          type="integer"
                          name="goals"
                          value={editableSkater.goals}
                          onChange={handleInputChange}
                        />
                      </td>
                      <td className="editStats__table-box editStats__table-box-assists">
                        <input
                          type="integer"
                          name="assists"
                          value={editableSkater.assists}
                          onChange={handleInputChange}
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
          </table>
        </form>
      </section>
    </article>
  );
};

export default GameStats;
