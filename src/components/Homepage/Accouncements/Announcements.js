import { announcements } from "../../../utils/announcements";
import "./Announcements.scss";

const Announcements = () => {
  const sortedAnnouncements = announcements.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  console.log(sortedAnnouncements);

  return (
    <article className="announcements">
      <section className="announcements__title">Latest Announcements</section>
      {sortedAnnouncements.map((announcement) => (
        <section className="announcements__box" key={announcement.id}>
          <section className="announcements__box-title">
            {announcement.title}
          </section>
          <section className="announcements__box-date">
            {announcement.date}
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
