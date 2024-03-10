import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import AddAnnouncement from "../../components/Admin/AddAnnouncement/AddAnnouncement"
import Footer from "../../components/Globals/Footer/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ManageAnnouncements.scss";

const ManageAnnouncements = ({ authUser }) => {
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
        <section className="manageAnnouncements__header">
          <Link className="manageAnnouncements__return-link" to="/admin/dashboard/">
            <FontAwesomeIcon
              className="manageAnnouncements__return-link-back-icon"
              icon={faArrowLeft}
            />
            <h1 className="manageAnnouncements__return-link-text">
              Return to Dashboard
            </h1>
          </Link>
        </section>
        <AddAnnouncement />
      </main>
      <Footer />
    </section>
  );
};

export default ManageAnnouncements;
