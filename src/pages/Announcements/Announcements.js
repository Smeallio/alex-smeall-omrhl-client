import Header from "../../components/Globals/Header/Header";
import Nav from "../../components/Globals/Nav/Nav";
import Footer from "../../components/Globals/Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAnnouncements } from "../../utils/api-utils";
import "./Announcements.scss";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(getAnnouncements());
      setAnnouncements(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (announcements === null) {
    return <p>Loading...</p>;
  }

  console.log(announcements);

  return (
    <section className="background">
      <Header />
      <Nav />
      <main className="announcements-page">
        <h1 className="announcements-page__header">Latest News & Updates</h1>
        <section className="announcements-page__feed">
          {announcements.map((announcement) => (
            <section
              className="announcements-page__block"
              key={announcement.id}
            >
              <section className="announcements-page__block-row">
                <p className="announcements-page__block-title">
                  {announcement.title}
                </p>
                <p className="announcements-page__block-date">
                  {announcement.date}
                </p>
              </section>
              <p className="announcements-page__block-content">
                {announcement.body}
              </p>
            </section>
          ))}
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default Announcements;
