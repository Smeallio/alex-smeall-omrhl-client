import "./GoalieStats.scss";

const GoalieStats = ({ team }) => {
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

  return (
    <article className="editGoalieStats">
      <section className="editGoalieStats__block">
        <form className="editGoalieStats__form">
          <table className="editGoalieStats__table">
            <caption className="editGoalieStats__table-title">{`${getTeamById(
              team
            )} Goalie`}</caption>
            <thead className="editGoalieStats__table-headers">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Win?</th>
                <th scope="col">Goals Against</th>
                <th scope="col" colSpan="2">
                  Edit
                </th>
              </tr>
            </thead>
          </table>
        </form>
      </section>
    </article>
  );
};

export default GoalieStats;
