import "./Skaters.scss";

const Skaters = ({ team, skaterStats }) => {

console.log(skaterStats)

  return (
    <article className="skaters">
      <table className="skaters__table">
        <caption className="skaters__table-title">{`${team} Skaters`}</caption>
        <thead className="skaters__table-headers">
          <tr className="skaters__table-headers-row">
            <th scope="col">Name</th>
            <th scope="col">No.</th>
            <th scope="col">Pos.</th>
            <th scope="col">G</th>
            <th scope="col">A</th>
          </tr>
        </thead>
        <tbody>
          {skaterStats.map((skater) => (
            <tr className="skaters__table-row" key={skater.id}>
              <td className="skaters__table-box skaters__table-box-name">
                {skater.player_name}
              </td>
              <td className="skaters__table-box skaters__table-box-no">
                {skater.player_number === 0 ? "" : skater.player_number}
              </td>
              <td className="skaters__table-box skaters__table-box-pos">
                {skater.player_position}
              </td>
              <td className="skaters__table-box skaters__table-box-goals">
                {skater.goals}
              </td>
              <td className="skaters__table-box skaters__table-box-assists">
                {skater.assists}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Skaters;
