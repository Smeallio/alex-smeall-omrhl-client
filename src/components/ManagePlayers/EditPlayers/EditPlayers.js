import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPlayersByTeam, postPlayer } from "../../../utils/api-utils";
import "./EditPlayers.scss";

const EditPlayers = ({ players }) => {
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
                  <FontAwesomeIcon icon={faPenToSquare} />
                </td>
                <td className="editPlayers__table-box editPlayers__table-box-delete">
                  <FontAwesomeIcon icon={faTrashCan} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
};

export default EditPlayers;