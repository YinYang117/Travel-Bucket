import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { editTrip } from '../../store/trip'
import './EditTrip.css';

function EditTripForm ({ hideModal, trip }) {
  const dispatch = useDispatch();
  let startHolder = new Date(trip.startDate)
  let endHolder = new Date(trip.endDate)
  const [name, setName] = useState(trip.name);
  const [destination, setDestination] = useState(trip.destination);
  const [imageUrl, setImageUrl] = useState(trip.imageUrl);
  const [startDate, setStartDate] = useState(startHolder.getFullYear()+"-"+(startHolder.getMonth()+1)+"-"+(startHolder.getDate()+1));
  const [endDate, setEndDate] = useState(endHolder.getFullYear()+"-"+(endHolder.getMonth()+1)+"-"+(endHolder.getDate()+1));
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)


  const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/


  useEffect(() => {
      let errors = [];
      if(!(imageUrl.match(url))) errors.push("Please enter a valid URL.")
      if(!imageUrl.length) errors.push("Please enter a URL.")
      if(!name.length) errors.push("Please enter a trip name.")
      if(!destination.length) errors.push("Please enter a destination.")
      if(!startDate.length) errors.push("Please enter a start date.")
      if(!endDate.length) errors.push("Please enter a end date.")
      setErrors(errors)
  }, [imageUrl, name, destination, startDate, endDate])

  const submitTripEdits = () => {
      setHasSubmitted(true)
      if(errors.length > 0) return; 

      const editedTripData = trip
      editedTripData.name = name
      editedTripData.destination = destination
      editedTripData.imageUrl = imageUrl
      editedTripData.startDate = startDate
      editedTripData.endDate = endDate
      
      dispatch(editTrip(editedTripData))
      .then(() => hideModal())
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancelClick = (e) => {
    e.preventDefault()
    hideModal();
  };

  return (
    <div className="formContainer3">
        <form
        onSubmit={e => {
            e.preventDefault();
            submitTripEdits();
        }}>
            <ul className="new-trip-errors">
            {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='label'>
                Trip Name:
            </label>
            <input onChange={e => setName(e.target.value)} type="text" className="new-trip-name" placeholder={'Trip Name'} value={name} />
            <label className='label'>
                Trip Destination:
            </label>
            <input onChange={e => setDestination(e.target.value)} type="text" className="new-trip-destination" placeholder={'Trip Destination'} value={destination} />
            <label className='label'>
                Trip Main Image URL:
            </label>
            <input onChange={e => setImageUrl(e.target.value)} type="text" className="new-trip-image" placeholder={'Trip Image Url'} value={imageUrl} />
            <label className='label'>
                Trip Start:
            </label>
            <input onChange={e => setStartDate(e.target.value)} type="date" id="edit-trip-start-date" value={startDate} />
            <label className='label'>
                Trip End:
            </label>
            <input onChange={e => setEndDate(e.target.value)} type="date" className="new-trip-end-date" placeholder={trip?.endDate} value={endDate} />
            <div id="edit_trip_buttons">
                <button id="edit" className="confirmEditsButton" type="submit">Confirm Edits</button>
                <button id="edit" className="cancelEdits" onClick={handleCancelClick}>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default EditTripForm;