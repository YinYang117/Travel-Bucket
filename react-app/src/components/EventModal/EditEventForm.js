import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editEvent } from "../../store/event";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal"


function EditEvent({closeModal, event}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [imageUrl, setImageUrl] = useState(event.imageUrl);
    const [startDate, setStartDate] = useState(event.startDate);
    const [endDate, setEndDate] = useState(event.endDate);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])


    const submitEdits = () => {
        const editedEvent = event;
        setErrors([]);
        // trip and owner id stays the same
        editedEvent.name = name
        editedEvent.description = description
        editedEvent.imageUrl = imageUrl
        editedEvent.location = location
        editedEvent.startDate = startDate
        editedEvent.endDate = endDate

        dispatch(editEvent(editedEvent))
        .then(() => closeModal())
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
    };

    const handleCancelClick = (e) => {
        e.preventDefault()
        closeModal();
      };

    return (
        <>
            <div className="formContainer">
                <h1> Edit An Event </h1>
                <form
                    className="edit-event-form"
                    onSubmit={e => {
                        e.preventDefault();
                        submitEdits();
                    }}>
                    <label className='label'>
                        Event Name:
                    </label>
                    <input onChange={e => setName(e.target.value)} type="text" className="edit-event-name" placeholder='Event Name' value={name} />
                    <label className='label'>
                        Event Description:
                    </label>
                    <input onChange={e => setDescription(e.target.value)} type="text" className="edit-event-description" placeholder='Event Description' value={description} />
                    <label className='label'>
                        Event Location:
                    </label>
                    <input onChange={e => setLocation(e.target.value)} type="text" className="edit-event-location" placeholder='Event Location' value={location} />
                    <label className='label'>
                        Event Image URL:
                    </label>
                    <input onChange={e => setImageUrl(e.target.value)} type="text" className="edit-event-image" placeholder='Image Url' value={imageUrl} />
                    <label className='label'>
                        Event Start:
                    </label>
                    <input onChange={e => setStartDate(e.target.value)} type="date" className="edit-event-start-date" value={startDate} />
                    <label className='label'>
                        Event End:
                    </label>
                    <input onChange={e => setEndDate(e.target.value)} type="date" className="edit-event-end-date" value={endDate} />
                    <ul className="errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div id="edit_trip_buttons">
                        <button className="edit-event-submit" type='submit' >Submit edit event</button>
                        <button id="cancel" className="cancelEdits" onClick={handleCancelClick}>Cancel</button>
                    </div>
                </form>
            </div>


        </>
    );
}
export default EditEvent;
