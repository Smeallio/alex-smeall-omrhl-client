import axios from "axios";
import { useState, useEffect } from "react";
import { getAnnouncements } from "../../../utils/api-utils";
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

  announcements.sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (timestamp) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const sortedAndSlicedAnnouncements = announcements.slice(0, 2);

  console.log(sortedAndSlicedAnnouncements);

  return (
    <article className="announcements">
      <section className="announcements__title">Latest Announcements</section>
      {sortedAndSlicedAnnouncements.map((announcement) => (
        <section className="announcements__box" key={announcement.id}>
          <section className="announcements__box-title">
            {announcement.title}
          </section>
          <section className="announcements__box-date">
            {formatDate(announcement.date)}
          </section>
          <section className="announcements__box-body">
            {announcement.body}
          </section>
        </section>
      ))}
    </article>
  );
};

export default Announcements;
