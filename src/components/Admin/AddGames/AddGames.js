import CustomDatePicker from "../../Globals/DatePicker/DatePicker";
import axios from "axios";
import { useState, useRef } from "react";
import { postGame } from "../../../utils/api-utils";
import "./AddGames.scss";

const AddGames = ({ fetchGames, getIdByTeam }) => {
  const [newGame, setNewGame] = useState({ date: new Date() });
  const formRef = useRef();

  const addGame = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(newGame.date).toLocaleDateString(
      "en-US",
      dateOptions
    );
    const game = {
      date: formattedDate,
      time: formData.get("time"),
      complete: 0,
      team1_name: formData.get("team1_name"),
      team1_team_id: getIdByTeam(formData.get("team1_name")),
      team1_score: null,
      team1_result: null,
      team2_name: formData.get("team2_name"),
      team2_team_id: getIdByTeam(formData.get("team2_name")),
      team2_score: null,
      team2_result: null,
      notes: formData.get("notes"),
      game_type: formData.get("game_type"),
      season: formData.get("season"),
    };
    try {
      await axios.post(postGame(), game);
      fetchGames();
      event.target.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDateChange = (date) => {
    setNewGame({ ...newGame, date });
  };

  return (
    <article className="addGames">
      <h2 className="addGames__header">Add Games</h2>
      <form className="addGames__form" onSubmit={addGame} ref={formRef}>
        <label className="addGames__form-type">
          <span>Type:</span>
          <select className="addGames__form-type-input" name="game_type">
            <option value="none">Pick one...</option>
            <option value="Regular Season">Regular Season</option>
            <option value="Playoffs">Playoffs</option>
          </select>
        </label>
        <label className="addGames__form-season">
          <span>Season:</span>
          <select className="addGames__form-season-input" name="season">
            <option value="none">Pick one...</option>
            <option value="24-25">24-25</option>
            <option value="23-24">23-24</option>
          </select>
        </label>
        <label className="addGames__form-date">
          <span>Date:</span>
          <CustomDatePicker
            selectedDate={newGame.date}
            handleDateChange={handleDateChange}
            className={"addGames__form-date-input"}
          />
        </label>
        <label className="addGames__form-time">
          <span>Time:</span>
          <input
            className="addGames__form-time-input"
            type="text"
            name="time"
          ></input>
        </label>
        <label className="addGames__form-arena">
          <span>Arena:</span>
          <select className="addGames__form-arena-input" name="arena">
            <option value="none">Pick one...</option>
            <option value="Capital Subaru Arena">Capital Subaru Arena</option>
            <option value="St. Bon's Forum">St. Bon's Forum</option>
          </select>
        </label>
        <label className="addGames__form-team">
          <span>Team 1:</span>
          <select className="addGames__form-team-input" name="team1_name">
            <option value="none">Pick one...</option>
            <option value="Fogtown Leprechauns">Fogtown Leprechauns</option>
            <option value="Duck Island Saints">Duck Island Saints</option>
            <option value="Mighty Moose">Mighty Moose</option>
            <option value="Kraken Beers">Kraken Beers</option>
            <option value="The Witless Bay Liners">
              The Witless Bay Liners
            </option>
            <option value="Quidi Vidi Bears">Quidi Vidi Bears</option>
          </select>
        </label>
        <label className="addGames__form-team">
          <span>Team 2:</span>
          <select className="addGames__form-team-input" name="team2_name">
            <option value="none">Pick one...</option>
            <option value="Fogtown Leprechauns">Fogtown Leprechauns</option>
            <option value="Duck Island Saints">Duck Island Saints</option>
            <option value="Mighty Moose">Mighty Moose</option>
            <option value="Kraken Beers">Kraken Beers</option>
            <option value="The Witless Bay Liners">
              The Witless Bay Liners
            </option>
            <option value="Quidi Vidi Bears">Quidi Vidi Bears</option>
          </select>
        </label>
        <label className="addGames__form-notes">
          <span>Notes:</span>
          <textarea
            className="addGames__form-notes-input"
            name="notes"
          ></textarea>
        </label>
        <button className="addGames__form-button" type="submit">
          ADD GAME
        </button>
      </form>
    </article>
  );
};

export default AddGames;
