import axios from "axios";
import { useRef } from "react";
import { postPlayer } from "../../../utils/api-utils";
import "./AddPlayers.scss";

const AddPlayers = ({ teamId, fetchPlayers }) => {
  const formRef = useRef();

  const addPlayer = async (event) => {
    event.preventDefault();
    const player = {
      name: formRef.current.name.value,
      team_id: teamId,
      position: formRef.current.position.value,
      number: formRef.current.number.value,
      played_23_24: formRef.current.played_23_24.checked ? 1 : 0,
      played_24_25: formRef.current.played_24_25.checked ? 1 : 0,
    };
    try {
      await axios.post(postPlayer(teamId), player);
      fetchPlayers();
      formRef.current.name.value = "";
      formRef.current.position.value = "F";
      formRef.current.number.value = "";
      formRef.current.played_23_24.checked = false;
      formRef.current.played_24_25.checked = false;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <article className="addPlayers">
      <h3 className="addPlayers__header">Add Players</h3>
      <form className="addPlayers__form" onSubmit={addPlayer} ref={formRef}>
        <label className="addPlayers__form-name">
          <span>Name:</span>
          <input
            className="addPlayers__form-name-input"
            type="text"
            name="name"
          ></input>
        </label>
        <label className="addPlayers__form-number">
          <span>Number:</span>
          <input
            className="addPlayers__form-number-input"
            type="number"
            name="number"
          ></input>
        </label>
        <label className="addPlayers__form-position">
          <span>Position:</span>
          <select className="addPlayers__form-position-input" name="position">
            <option value="F">F</option>
            <option value="D">D</option>
            <option value="G">G</option>
          </select>
        </label>
        <label className="addPlayers__form-season">
          <span>23-24:</span>
          <input
            className="addPlayers__form-season-input"
            type="checkbox"
            name="played_23_24"
          ></input>
        </label>
        <label className="addPlayers__form-season">
          <span>24-25:</span>
          <input
            className="addPlayers__form-season-input"
            type="checkbox"
            name="played_24_25"
          ></input>
        </label>
        <button className="addPlayers__form-button" type="submit">
          ADD PLAYER
        </button>
      </form>
    </article>
  );
};

export default AddPlayers;
