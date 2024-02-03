import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import TeamHeader from "../../components/TeamHeader/TeamHeader";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByTeam } from "../../utils/api-utils";
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

  useEffect(() => {
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
    fetchPlayers();
  }, [teamId]);

  console.log(players);
  console.log(getPlayersByTeam(teamId));

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
          <table className="managePlayers__table">
            <caption className="managePlayers__table-title">
              Roster & Statistics (Skaters)
            </caption>
            <thead className="managePlayers__table-headers">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">No.</th>
                <th scope="col">Pos.</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr className="managePlayers__table-row" key={player.id}>
                  <td className="managePlayers__table-box">{player.name}</td>
                  <td className="managePlayers__table-box">{player.number}</td>
                  <td className="managePlayers__table-box">
                    {player.position}
                  </td>
                  <td className="managePlayers__table-box">
                    <button
                      className="managePlayers__table-box-button"
                      onClick={() => handleEditClick(player)}
                    >
                      Edit Player
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="managePlayers__table-row">
                <td className="managePlayers__table-box">
                  <input
                    className="managePlayers__table-box-input"
                    type="text"
                    name="name"
                  ></input>
                </td>
                <td className="managePlayers__table-box">
                  <input
                    className="managePlayers__table-box-input"
                    type="text"
                    name="number"
                  ></input>
                </td>
                <td className="managePlayers__table-box">
                  <select
                    className="managePlayers__table-box-input"
                    name="position"
                  >
                    <opton value="F">F</opton>
                    <opton value="D">D</opton>
                    <opton value="G">G</opton>
                  </select>
                </td>
                <td className="managePlayers__table-box">
                  <button className="managePlayers__table-box-button">
                    Add Player
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default ManagePlayers;
