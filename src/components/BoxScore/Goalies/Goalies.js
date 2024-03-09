import "./Goalies.scss";

const  Goalies = ({ goalieStats }) => {

  return (
    <article className="goalies">
      <table className="goalies__table">
        <caption className="goalies__table-title">Goalie</caption>
        <thead className="goalies__table-headers">
          <tr className="goalies__table-headers-row">
            <th scope="col">Name</th>
            <th scope="col">No.</th>
            <th scope="col">Pos.</th>
            <th scope="col">W</th>
            <th scope="col">GA</th>
          </tr>
        </thead>
        <tbody>
          {goalieStats.map((goalie) => (
            <tr className="goalies__table-row" key={goalie.id}>
              <td className="goalies__table-box goalies__table-box-name">
                {goalie.player_name}
              </td>
              <td className="goalies__table-box skaters__table-box-no">
                {goalie.player_number === 0 ? "" : goalie.player_number}
              </td>
              <td className="goalies__table-box goalies__table-box-pos">
                {goalie.player_position}
              </td>
              <td className="goalies__table-box goalies__table-box-goals">
                {goalie.wins}
              </td>
              <td className="goalies__table-box goalies__table-box-assists">
                {goalie.goalsAgainst}
              </td>
            </tr>
          ))}
          </tbody>
      </table>
    </article>
  );
};

export default Goalies;
