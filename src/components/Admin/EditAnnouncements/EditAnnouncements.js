import ConfirmModal from "../../Globals/ConfirmModal/ConfirmModal";
import CustomDatePicker from "../../Globals/DatePicker/DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useState } from "react";
import {
  updateAnnouncement,
  deleteAnnouncement,
} from "../../../utils/api-utils";
import "./EditAnnouncements.scss";

const EditAnnouncements = ({ announcements, fetchAnnouncements }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editableAnnouncement, setEditableAnnouncement] = useState(0);

  const handleDeleteAnnouncement = async (announcementId) => {
    setConfirmDelete(announcementId);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeleteAnnouncement = async () => {
    try {
      await axios.delete(deleteAnnouncement(confirmDelete));
      console.log("Played deleted successfully");
      fetchAnnouncements();
    } catch (err) {
      console.log("Player delete failed ", err);
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleEditClick = (announcement) => {
    console.log("Edit clicked: ", announcement);
    setEditableAnnouncement({ ...announcement });
  };

  const cancelEdit = () => {
    setEditableAnnouncement(0);
  };

  const confirmEditAnnouncement = async (event) => {
    event.preventDefault();
    const updatedAnnouncement = {
      date: editableAnnouncement.date,
      title: editableAnnouncement.title,
      body: editableAnnouncement.body,
    };
    console.log(updatedAnnouncement);
    try {
      await axios.put(
        updateAnnouncement(editableAnnouncement.id),
        updatedAnnouncement
      );
      fetchAnnouncements();
    } catch (err) {
      console.log("Error updating game: ", err);
    }
    setEditableAnnouncement(0);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setEditableAnnouncement((prevEditableAnnouncement) => ({
      ...prevEditableAnnouncement,
      [name]: updatedValue === true ? 1 : updatedValue,
    }));
  };

  const handleDateChange = (date) => {
    setEditableAnnouncement({ ...editableAnnouncement, date });
  };

  const formatDate = (timestamp) => {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  if (announcements === null) {
    return <p>Loading...</p>;
  }

  return (
    <article className="editAnnouncements">
      <h2 className="editAnnouncements__header">Edit Announcements</h2>
      <section className="editAnnouncements__block">
        <form className="editAnnouncements__form">
          <table className="editAnnouncements__table">
            <caption className="editAnnouncements__table-title">
              Announcements
            </caption>
            <thead className="editAnnouncements__table-headers">
              <tr className="editAnnouncements__table-row">
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col" colSpan="2">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr
                  className="editAnnouncements__table-row"
                  key={announcement.id}
                >
                  {editableAnnouncement.id === announcement.id ? (
                    <>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-date"
                        data-label="Date"
                      >
                        <CustomDatePicker
                          selectedDate={editableAnnouncement.date}
                          handleDateChange={handleDateChange}
                        />
                      </td>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-title"
                        data-label="Title"
                      >
                        <input
                          type="text"
                          name="time"
                          value={editableAnnouncement.title}
                          onChange={handleInputChange}
                        ></input>
                      </td>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-content"
                        data-label="Content"
                      >
                        <textarea
                            name="content"
                            value={editableAnnouncement.body}
                            onChange={handleInputChange}
                        ></textarea>
                      </td>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-icons"
                        data-label="Edit"
                      >
                        <FontAwesomeIcon
                          className="editAnnouncements__table-box-icon editAnnouncements__table-box-icon-check"
                          icon={faCheck}
                          onClick={confirmEditAnnouncement}
                        />
                        <FontAwesomeIcon
                          className="editAnnouncements__table-box-icon editAnnouncements__table-box-icon-x"
                          icon={faXmark}
                          onClick={cancelEdit}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-date"
                        data-label="Date"
                      >
                        {formatDate(announcement.date)}
                      </td>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-title"
                        data-label="Title"
                      >
                        {announcement.title}
                      </td>
                      <td
                        className="editAnnouncements__table-box editAnnouncements__table-box-content"
                        data-label="Content"
                      >
                        <span>{announcement.body}</span>
                      </td>
                      <td
                          className="editAnnouncements__table-box editAnnouncements__table-box-icons"
                          data-label="Edit"
                        >
                          <FontAwesomeIcon
                            className="editAnnouncements__table-box-icon editAnnouncements__table-box-icon-edit"
                            icon={faPenToSquare}
                            onClick={() => handleEditClick(announcement)}
                          />
                          <FontAwesomeIcon
                            className="editAnnouncements__table-box-icon editAnnouncements__table-box-icon-delete"
                            icon={faTrashCan}
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                          />
                        </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </section>
      {confirmDelete && (
        <ConfirmModal
          message="Are you sure you want to delete this game? You will not be able to undo this."
          cancel={cancelDelete}
          confirm={confirmDeleteAnnouncement}
        />
      )}
    </article>
  );
};

export default EditAnnouncements;
