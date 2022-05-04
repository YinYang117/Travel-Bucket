import React, {useState, useEffect} from "react";
import { Modal } from "../../context/Modal";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import * as tripActions from "../../store/trip"


function AddATripModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [ownerId, setOwnerId] = useState(sessionUser?.id);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
      if (!sessionUser) history.push('/')
  }, [sessionUser])

  const submitNewTrip = () => {
      const newTripData = { };
        setErrors([]);
        setOwnerId(sessionUser.id)
        newTripData.ownerId = ownerId
        newTripData.name = name
        newTripData.destination = destination
        newTripData.imageUrl = imageUrl
        newTripData.startDate = startDate
        newTripData.endDate = endDate

        dispatch(tripActions.newTrip(newTripData))
        .then(() => {
          setName("");
          setDestination("");
          setImageUrl("");
          setStartDate("");
          setEndDate("");
          setErrors
          ([]);
          setShowModal(false)
          history.push('/Home')
          // need a .then and redirect IF you add a new trip while on another trip details page
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

        return <redirect to='/Home' />;
  }

  return (
    <>
      <button className="AddATripButton" onClick={() => setShowModal(true)}>
        {/* <i class="fa-solid fa-right-to-bracket"></i> */}
        Add A Trip
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="formContainer">
            <h1> Add A Trip </h1>
            <form
              className="new-trip-form"
              onSubmit={e => {
                e.preventDefault();
                submitNewTrip();
              }}>
              <label className='label'>
                Trip Name:
              </label>
              <input onChange={e => setName(e.target.value)} type="text" className="new-trip-name" placeholder='Trip Name' value={name} />
              <label className='label'>
                Trip Destination:
              </label>
              <input onChange={e => setDestination(e.target.value)} type="text" className="new-trip-destination" placeholder='Trip Destination' value={destination} />
              <label className='label'>
                Trip Main Image URL:
              </label>
              <input onChange={e => setImageUrl(e.target.value)} type="text" className="new-trip-image" placeholder='Image Url' value={imageUrl} />
              <label className='label'>
                Trip Start:
              </label>
              <input onChange={e => setStartDate(e.target.value)} type="date" className="new-trip-start-date" value={startDate} />
              <label className='label'>
                Trip End:
              </label>
              <input onChange={e => setEndDate(e.target.value)} type="date" className="new-trip-end-date" value={endDate} />
              <ul className="new-trip-errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <button className="new-trip-submit" type='submit' >Submit New Trip</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default AddATripModal;
