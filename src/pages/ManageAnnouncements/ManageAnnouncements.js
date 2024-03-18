import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import AddAnnouncement from "../../components/Admin/AddAnnouncement/AddAnnouncement";
import EditAnnouncements from "../../components/Admin/EditAnnouncements/EditAnnouncements";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAnnouncements } from "../../utils/api-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ManageAnnouncements.scss";

const ManageAnnouncements = ({ authUser }) => {
  const [announcements, setAnnouncements] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const response = await axios.get(getAnnouncements());
      setAnnouncements(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  useEffect(() => {
    document.title = "Odd Man Rush Hockey League - Announcements Dashboard";
  }, []);

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

  if (announcements === null) {
    return <p>Loading...</p>;
  }

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="admin-main">
        <section className="manageAnnouncements__header">
          <Link
            className="manageAnnouncements__return-link"
            to="/admin/dashboard/"
          >
            <FontAwesomeIcon
              className="manageAnnouncements__return-link-back-icon"
              icon={faArrowLeft}
            />
            <h1 className="manageAnnouncements__return-link-text">
              Return to Dashboard
            </h1>
          </Link>
        </section>
        <AddAnnouncement fetchAnnouncements={fetchAnnouncements} />
        <EditAnnouncements announcements={announcements} fetchAnnouncements={fetchAnnouncements} />
      </main>
      <Footer />
    </section>
  );
};

export default ManageAnnouncements;
