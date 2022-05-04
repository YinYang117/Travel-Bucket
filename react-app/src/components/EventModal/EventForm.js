import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from "../../store/event";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal"


function Event() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const eventsObj = useSelector(state => state.events)
    const events = Object.values(eventsObj)


    const [ownerId, setOwnerId] = useState(sessionUser?.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [destionation, setDestination] = useState("");
    const [location, setLocation] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [tripId, setTripId] = useState("");
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])


    const submitNewEvent = () => {
        const newEventData = {};
        setErrors([]);
        setOwnerId(sessionUser.id)
        newEventData.ownerId = ownerId
        newEventData.tripId = 1
        newEventData.name = name
        newEventData.description = description
        newEventData.imageUrl = imageUrl
        newEventData.location = location
        newEventData.startDate = startDate
        newEventData.endDate = endDate

        console.log("NEW EVENT DATA FROM MODAL --------------------", newEventData)
        dispatch(eventActions.newEvent(newEventData))

    };



    return (
        <>
          <button className="AddAEventButton" onClick={() => setShowModal(true)}>
            {/* <i class="fa-solid fa-right-to-bracket"></i> */}
            Add An Event
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className="formContainer">
                <h1> Add An Event </h1>
                <form
                  className="new-event-form"
                  onSubmit={e => {
                    e.preventDefault();
                    submitNewEvent();
                  }}>
                  <label className='label'>
                    Event Name:
                  </label>
                  <input onChange={e => setName(e.target.value)} type="text" className="new-event-name" placeholder='Event Name' value={name} />
                  <label className='label'>
                    Event Description:
                  </label>
                  <input onChange={e => setDescription(e.target.value)} type="text" className="new-event-description" placeholder='Event Description' value={description} />
                  <label className='label'>
                    Event Location:
                  </label>
                  <input onChange={e => setLocation(e.target.value)} type="text" className="new-event-location" placeholder='Event Location' value={location} />
                  <label className='label'>
                    Event Image URL:
                  </label>
                  <input onChange={e => setImageUrl(e.target.value)} type="text" className="new-event-image" placeholder='Image Url' value={imageUrl} />
                  <label className='label'>
                    Event Start:
                  </label>
                  <input onChange={e => setStartDate(e.target.value)} type="date" className="new-event-start-date" value={startDate} />
                  <label className='label'>
                    Event End:
                  </label>
                  <input onChange={e => setEndDate(e.target.value)} type="date" className="new-event-end-date" value={endDate} />
                  <ul className="new-event-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                  </ul>
                  <button className="new-event-submit" type='submit' >Submit New event</button>
                </form>
              </div>
            </Modal>
          )}
        </>
      );
}
export default Event;
