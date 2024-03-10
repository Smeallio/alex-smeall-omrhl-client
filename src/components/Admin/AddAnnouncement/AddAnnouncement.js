import CustomDatePicker from "../../Globals/DatePicker/DatePicker";
import axios from "axios";
import { useState, useRef } from "react";
import { postAnnouncement } from "../../../utils/api-utils";
import "./AddAnnouncement.scss";

const AddAnnouncement = ({ fetchAnnouncements }) => {
  const [newAnnouncement, setNewAnnouncement] = useState({ date: new Date() });
  const formRef = useRef();

  const addAnnouncement = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = newAnnouncement.date.toLocaleDateString(
      "en-US",
      dateOptions
    );
    const announcement = {
      title: formData.get("title"),
      date: formattedDate,
      body: formData.get("body"),
    };
    console.log(announcement);
    try {
      await axios.post(postAnnouncement(), announcement);
      fetchAnnouncements();
      event.target.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDateChange = (date) => {
    console.log("Selected date:", date);
    setNewAnnouncement({ ...newAnnouncement, date });
  };

  return (
    <article className="addAnnouncement">
      <h3 className="addAnnouncement__header">Add Announcement</h3>
      <form className="addAnnouncement__form" onSubmit={addAnnouncement} ref={formRef}>
        <label className="addAnnouncement__form-date">
          <span>Date:</span>
          <CustomDatePicker
            selectedDate={newAnnouncement.date}
            handleDateChange={handleDateChange}
          />
        </label>
        <label className="addAnnouncement__form-title">
          <span>Title:</span>
          <input
            className="addAnnouncement__form-title-input"
            type="text"
            name="title"
          ></input>
        </label>
        <label className="addAnnouncement__form-body">
          <span>Body:</span>
          <textarea className="addAnnouncement__form-body-input" name="body">
          </textarea>
        </label>
        <button className="addAnnouncement__form-button" type="submit">
          ADD ANNOUNCEMENT
        </button>
      </form>
    </article>
  );
};

export default AddAnnouncement;
