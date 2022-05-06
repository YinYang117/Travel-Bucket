import { useDispatch } from "react-redux";
import { deleteEvent } from '../../store/event';

function DeleteEvent ({ hideModal, event }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const id = parseInt(event.id)
    e.preventDefault();
      dispatch(deleteEvent(id))
      hideModal();
  }
  const handleCancelClick = (e) => {
    e.preventDefault()
    hideModal();
  };

  return (
    <form id="delete_event_form" onSubmit={handleSubmit}>
      <h3>Are you sure you want to delete your <span id="delete_event_name">{event.name}</span> Event?</h3>
      <div id="delete_event_buttons">
        <button id="delete" className="deleteButton" type="submit">Confirm Delete</button>
        <button id="cancel" className="cancelDelete" onClick={handleCancelClick}>Cancel</button>
      </div>
    </form>
  )
}

export default DeleteEvent;
