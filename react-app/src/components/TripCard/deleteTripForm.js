import { useDispatch } from "react-redux";
import { deleteTrip } from '../../store/trip'

function DeleteTripForm ({ hideModal, trip }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(deleteTrip(trip.id))
      hideModal();
  }
  const handleCancelClick = (e) => {
    e.preventDefault()
    hideModal();
  };

  return (
    <form id="delete_trip_form" onSubmit={handleSubmit}>
      <h3>Are you sure you want to delete this Trip?
        <p id="delete_trip_name">{trip.name} ?</p>
      </h3>
      <div id="delete_trip_buttons">
        <button id="delete" className="deleteButton" type="submit">Confirm Delete</button>
        <button id="cancel" className="cancelDelete" onClick={handleCancelClick}>Cancel</button>
      </div>
    </form>
  )
}

export default DeleteTripForm;
