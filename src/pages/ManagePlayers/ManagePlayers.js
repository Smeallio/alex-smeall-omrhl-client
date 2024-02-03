import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import TeamHeader from "../../components/TeamHeader/TeamHeader";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByTeam, postPlayer } from "../../utils/api-utils";
import "./ManagePlayers.scss";

const ManagePlayers = () => {
  const { teamName } = useParams();

  const [players, setPlayers] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [editablePlayer, setEditablePlayer] = useState(null);

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

  useEffect(() => {
    fetchPlayers();
  }, [teamId]);

  console.log(players);
  console.log(teamId);
  console.log(getPlayersByTeam(teamId));

  const formRef = useRef();

  const addPlayer = async (event) => {
    event.preventDefault();
    const player = {
      name: formRef.current.name.value,
      team_id: teamId,
      position: formRef.current.position.value,
      number: formRef.current.number.value,
    };
    try {
      await axios.post(postPlayer(teamId), player).then(() => {
        alert("New Player Added");
      });

      fetchPlayers();

      formRef.current.name.value = "";
      formRef.current.position.value = "F";
      formRef.current.number.value = "";
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditClick = (player) => {
    setEditablePlayer({ ...player });
  };

  if (players === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <Nav />
      <main className="admin-main">
        <TeamHeader />
        <article className="managePlayers">
          <h3 className="managePlayers__header">Add Players</h3>
          <form
            className="managePlayers__add"
            onSubmit={addPlayer}
            ref={formRef}
          >
            <label className="managePlayers__add-name">
              <span>Name:</span>
              <input
                className="managePlayers__add-name-input"
                type="text"
                name="name"
              ></input>
            </label>
            <label className="managePlayers__add-number">
              <span>Number:</span>
              <input
                className="managePlayers__add-number-input"
                type="number"
                name="number"
              ></input>
            </label>
            <label className="managePlayers__add-position">
              <span>Position:</span>
              <select
                className="managePlayers__add-position-input"
                name="position"
              >
                <option value="F">F</option>
                <option value="D">D</option>
                <option value="G">G</option>
              </select>
            </label>
            <button className="managePlayers__add-button" type="submit">
              ADD PLAYER
            </button>
          </form>
          <h3 className="managePlayers__header">Edit Players</h3>
          <section className="managePlayers__edit">
            <table className="managePlayers__table">
              <caption className="managePlayers__table-title">
                Roster & Statistics (Skaters)
              </caption>
              <thead className="managePlayers__table-headers">
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
                  <tr className="managePlayers__table-row" key={player.id}>
                    <td className="managePlayers__table-box managePlayers__table-box-name">
                      {player.name}
                    </td>
                    <td className="managePlayers__table-box managePlayers__table-box-number">
                      {player.number}
                    </td>
                    <td className="managePlayers__table-box managePlayers__table-position">
                      {player.position}
                    </td>
                    <td className="managePlayers__table-box managePlayers__table-box-edit">
                      <FontAwesomeIcon icon={faPenToSquare} />
                      {/* <button
                      className="managePlayers__table-box-button-edit"
                      onClick={() => handleEditClick(player)}
                    >
                      Edit
                    </button> */}
                    </td>
                    <td className="managePlayers__table-box managePlayers__table-box-delete">
                      <FontAwesomeIcon icon={faTrashCan} />
                      {/* <button
                      className="managePlayers__table-box-button-del"
                      onClick={() => handleEditClick(player)}
                    >
                      Delete
                    </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default ManagePlayers;
