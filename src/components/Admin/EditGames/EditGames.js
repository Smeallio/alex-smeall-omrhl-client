import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import CustomDatePicker from "../../Globals/DatePicker/DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState } from "react";
import { updateGame, deleteGame } from "../../../utils/api-utils";
import "./EditGames.scss";

const EditGames = ({ games, fetchGames, getIdByTeam }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editableGame, setEditableGame] = useState(0);

  const handleDeleteGame = async (gameId) => {
    setConfirmDelete(gameId);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeleteGame = async () => {
    try {
      await axios.delete(deleteGame(confirmDelete));
      console.log("Played deleted successfully");
      fetchGames();
    } catch (err) {
      console.log("Player delete failed ", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEditClick = (game) => {
    console.log("Edit clicked: ", game);
    setEditableGame({ ...game });
  };

  const cancelEdit = () => {
    setEditableGame(0);
  };

  const determineWinner = (game) => {
    if (game.team1_score > game.team2_score) {
      return game.team1_name + " win";
    } else if (game.team2_score > game.team1_score) {
      return game.team2_name + " win";
    } else {
      return "Tie game";
    }
  };

  const determineTeamOneResult = (game) => {
    if (game.team1_score > game.team2_score) {
      return "win";
    } else if (game.team2_score > game.team1_score) {
      return "loss";
    } else {
      return "tie";
    }
  };

  const determineTeamTwoResult = (game) => {
    if (game.team2_score > game.team1_score) {
      return "win";
    } else if (game.team1_score > game.team2_score) {
      return "loss";
    } else {
      return "tie";
    }
  };

  const confirmEditGame = async (event) => {
    event.preventDefault();
    const updatedGame = {
      date: editableGame.date,
      time: editableGame.time,
      complete: editableGame.complete,
      team1_name: editableGame.team1_name,
      team1_team_id: getIdByTeam(editableGame.team1_name),
      team1_score: editableGame.team1_score || " ",
      team1_result: determineTeamOneResult(editableGame) || " ",
      team2_name: editableGame.team2_name,
      team2_team_id: getIdByTeam(editableGame.team2_name),
      team2_score: editableGame.team2_score || " ",
      team2_result: determineTeamTwoResult(editableGame) || " ",
    };
    console.log(updatedGame);
    try {
      await axios.put(updateGame(editableGame.id), updatedGame);
      fetchGames();
    } catch (err) {
      console.log("Error updating game: ", err);
    }
    setEditableGame(0);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setEditableGame((prevEditableGame) => ({
      ...prevEditableGame,
      [name]: updatedValue === true ? 1 : updatedValue,
    }));
  };

  const handleDateChange = date => {
    setEditableGame({ ...editableGame, date })
  }

  if (games === null) {
    return <p>Loading...</p>;
  }

  return (
    <article className="editGames">
      <h3 className="editGames__header">Edit Games</h3>
      <section className="editGames__block">
        <form className="editGames__form">
          <table className="editGames__table">
            <caption className="editGames__table-title">Games</caption>
            <thead className="editGames__table-headers">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Complete?</th>
                <th scope="col">Team 1</th>
                <th scope="col">Team 1 Score</th>
                <th scope="col">Team 2</th>
                <th scope="col">Team 2 Score</th>
                <th scope="col">Result</th>
                <th scope="col" colSpan="2">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr className="editGames__table-row" key={game.id}>
                  {editableGame.id === game.id ? (
                    <>
                      <td className="editGames__table-box editGames__table-box-date">
                        <CustomDatePicker
                          selectedDate={editableGame.date}
                          handleDateChange={handleDateChange}
                        />
                      </td>
                      <td className="editGames__table-box editGames__table-box-time">
                        <input
                          type="text"
                          name="time"
                          value={editableGame.time}
                          onChange={handleInputChange}
                        ></input>
                      </td>
                      <td className="editGames__table-box editGames__table-box-complete">
                        <input
                          type="checkbox"
                          name="complete"
                          value={editableGame.complete}
                          checked={editableGame.complete}
                          onChange={handleInputChange}
                        ></input>
                      </td>
                      <td className="editGames__table-box editGames__table-box-team">
                        <select
                          name="team1_name"
                          value={editableGame.team1_name}
                          onChange={handleInputChange}
                        >
                          <option value="none">Pick one...</option>
                          <option
                            value="Fogtown Leprechauns"
                            selected={
                              editableGame.team1_name === "Fogtown Leprechauns"
                            }
                          >
                            Fogtown Leprechauns
                          </option>
                          <option
                            value="Duck Island Saints"
                            selected={
                              editableGame.team1_name === "Duck Island Saints"
                            }
                          >
                            Duck Island Saints
                          </option>
                          <option
                            value="Mighty Moose"
                            selected={
                              editableGame.team1_name === "Mighty Moose"
                            }
                          >
                            Mighty Moose
                          </option>
                          <option
                            value="Kraken Beers"
                            selected={
                              editableGame.team1_name === "Kraken Beers"
                            }
                          >
                            Kraken Beers
                          </option>
                        </select>
                      </td>
                      <td className="editGames__table-box editGames__table-box-team-score">
                        <input
                          type="text"
                          name="team1_score"
                          value={editableGame.team1_score}
                          onChange={handleInputChange}
                        ></input>
                      </td>
                      <td className="editGames__table-box editGames__table-box-team">
                        <select
                          name="team2_name"
                          value={editableGame.team3_name}
                          onChange={handleInputChange}
                        >
                          <option value="none">Pick one...</option>
                          <option
                            value="Fogtown Leprechauns"
                            selected={
                              editableGame.team2_name === "Fogtown Leprechauns"
                            }
                          >
                            Fogtown Leprechauns
                          </option>
                          <option
                            value="Duck Island Saints"
                            selected={
                              editableGame.team2_name === "Duck Island Saints"
                            }
                          >
                            Duck Island Saints
                          </option>
                          <option
                            value="Mighty Moose"
                            selected={
                              editableGame.team2_name === "Mighty Moose"
                            }
                          >
                            Mighty Moose
                          </option>
                          <option
                            value="Kraken Beers"
                            selected={
                              editableGame.team2_name === "Kraken Beers"
                            }
                          >
                            Kraken Beers
                          </option>
                        </select>
                      </td>
                      <td className="editGames__table-box editGames__table-box-team-score">
                        <input
                          type="text"
                          name="team2_score"
                          value={editableGame.team2_score}
                          onChange={handleInputChange}
                        ></input>
                      </td>
                      <td className="editGames__table-box editGames__table-box-result">
                        {game.complete ? determineWinner(game) : " "}
                      </td>
                      <td className="editGames__table-box editGames__table-box-check">
                        <FontAwesomeIcon
                          className="editGames__table-box-check-icon"
                          icon={faCheck}
                          onClick={confirmEditGame}
                        />
                      </td>
                      <td className="editGames__table-box editGames__table-box-x">
                        <FontAwesomeIcon
                          className="editGames__table-box-x-icon"
                          icon={faXmark}
                          onClick={cancelEdit}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="editGames__table-box editGames__table-box-date">
                        {game.date}
                      </td>
                      <td className="editGames__table-box editGames__table-box-time">
                        {game.time}
                      </td>
                      <td className="editGames__table-box editGames__table-box-complete">
                        {game.complete ? "Yes" : "No"}
                      </td>
                      <td className="editGames__table-box editGames__table-box-team">
                        {game.team1_name}
                      </td>
                      <td className="editGames__table-box editGames__table-box-team-score">
                        {game.team1_score ? game.team1_score : " "}
                      </td>
                      <td className="editGames__table-box editGames__table-box-team">
                        {game.team2_name}
                      </td>
                      <td className="editGames__table-box editGames__table-box-team-score">
                        {game.team2_score ? game.team2_score : " "}
                      </td>
                      <td className="editGames__table-box editGames__table-box-result">
                        {game.complete ? determineWinner(game) : " "}
                      </td>
                      <td className="editGames__table-box editGames__table-box-edit">
                        <FontAwesomeIcon
                          className="editGames__table-box-edit-icon"
                          icon={faPenToSquare}
                          onClick={() => handleEditClick(game)}
                        />
                      </td>
                      <td className="editGames__table-box editGames__table-box-delete">
                        <FontAwesomeIcon
                          className="editGames__table-box-delete-icon"
                          icon={faTrashCan}
                          onClick={() => handleDeleteGame(game.id)}
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
          message="Are you sure you want to delete this game? You will not be able to undo this."
          cancel={cancelDelete}
          confirm={confirmDeleteGame}
        />
      )}
    </article>
  );
};

export default EditGames;
