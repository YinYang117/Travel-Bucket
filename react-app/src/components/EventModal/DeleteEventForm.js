import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/event";
import "./DeleteEventModal.css";

function DeleteEvent({ hideModal, event }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const id = parseInt(event.id);
    e.preventDefault();
    dispatch(deleteEvent(id));
    hideModal();
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    hideModal();
  };

  return (
    <div className="formContainer6">
      <form onSubmit={handleSubmit}>
        <h3 id="delete-texts">
          Are you sure you want to delete your{" "}
          <span id="delete_event_name">{event.name}</span> Event?
        </h3>
        <div id="delete_event_buttons">
          <button id="delete" className="deleteButton" type="submit">
            Confirm Delete
          </button>
          <button
            id="cancel"
            className="cancelDelete"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteEvent;
