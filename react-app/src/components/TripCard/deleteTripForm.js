import { useDispatch } from "react-redux";
import { deleteTrip } from '../../store/trip'
import './TripCard.css';

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
    <div className="formContainer6">
      <form id="delete_trip_form" onSubmit={handleSubmit}>
        <h3>Are you sure you want to delete your <span id="delete_trip_name">{trip.name}</span> Trip?</h3>
        <div id="delete_trip_buttons">
          <button id="delete" className="deleteButton" type="submit">Confirm Delete</button>
          <button id="delete" className="cancelDelete" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteTripForm;
