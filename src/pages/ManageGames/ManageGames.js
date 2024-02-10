import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import TeamHeaderAdmin from "../../components/Admin/TeamHeaderAdmin/TeamHeaderAdmin";
import Footer from "../../components/Globals/Footer/Footer";
import "./ManageGames.scss";

const ManageGames = ({ authUser }) => {
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
        <TeamHeaderAdmin />
      </main>
      <Footer />
    </section>
  );
};

export default ManageGames;
