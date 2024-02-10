import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = ({ authUser }) => {
  if (authUser === false) {
    return (
      <section className="background">
        <Header />
        <Nav />
        <p>You must be logged in to view this page</p>
        <Footer />
      </section>
    );
  }

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <article className="dashboard">
          <h1 className="dashboard__title">Administrator Dashboard</h1>
          <h2 className="dashboard__subtitle">Update Teams</h2>
            <Link className="dashboard__link" to="/admin/dashboard/leprechauns">Fogtown Leprechauns</Link>
            <Link className="dashboard__link" to="/admin/dashboard/saints">Duck Island Saints</Link>
            <Link className="dashboard__link" to="/admin/dashboard/moose">Mighty Moose</Link>
            <Link className="dashboard__link" to="/admin/dashboard/kraken">Kraken Beers</Link>
          <h2 className="dashboard__subtitle">Update Games</h2>
          <Link className="dashboard__link" to="/admin/dashboard/games">Scores & Schedule</Link>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Dashboard;
