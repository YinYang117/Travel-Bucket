import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { editEvent } from "../../store/event";
import { useHistory } from "react-router-dom";
import './EditEventModal.css';


function EditEvent({closeModal, event}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    let startHolder = new Date(event.startDate)
    let endHolder = new Date(event.endDate)

    const [name, setName] = useState(event.name);
    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [imageUrl, setImageUrl] = useState(event.imageUrl);
    const [startDate, setStartDate] = useState(startHolder.getFullYear()+"-"+(startHolder.getMonth()+1)+"-"+(startHolder.getDate()+1));
    const [endDate, setEndDate] = useState(endHolder.getFullYear()+"-"+(endHolder.getMonth()+1)+"-"+(endHolder.getDate()+1));
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    
    useEffect(() => {
        const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        let errors = [];
        if(!(imageUrl.match(url))) errors.push("Please enter a valid URL.")
        if (!imageUrl.length) errors.push("Please enter a URL.")
        if (!name.length) errors.push("Please enter a name.")
        if (!description.length) errors.push("Please enter a description.")
        if (!location.length) errors.push("Please enter a location.")
        if (!startDate.length) errors.push("Please enter a startDate.")
        if (!endDate.length) errors.push("Please enter a endDate.")
        //errors for not finding a user in the database so need a useSelector for all users so might need a store for users maybe
        setErrors(errors)
    }, [name, description, location, startDate, endDate, imageUrl])


    const submitEdits = () => {
        setHasSubmitted(true)
        if (errors.length > 0) return;

        const editedEvent = event;
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
        <div className="formContainer5">
            <h1> Edit An Event </h1>
            <form
                className="edit-event-form"
                onSubmit={e => {
                    e.preventDefault();
                    submitEdits();
                }}>
                <ul className="errors">
                {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='eventlabel'>
                    Event Name:
                </label>
                <input onChange={e => setName(e.target.value)} type="text" className="edit-event-name" placeholder='Event Name' value={name} />
                <label className='eventlabel'>
                    Event Description:
                </label>
                <input onChange={e => setDescription(e.target.value)} type="text" className="edit-event-description" placeholder='Event Description' value={description} />
                <label className='eventlabel'>
                    Event Location:
                </label>
                <input onChange={e => setLocation(e.target.value)} type="text" className="edit-event-location" placeholder='Event Location' value={location} />
                <label className='eventlabel'>
                    Event Image URL:
                </label>
                <input onChange={e => setImageUrl(e.target.value)} type="text" className="edit-event-image" placeholder='Image Url' value={imageUrl} />
                <label className='eventlabel'>
                    Event Start:
                </label>
                <input onChange={e => setStartDate(e.target.value)} type="date" className="edit-event-start-date" value={startDate} />
                <label className='eventlabel'>
                    Event End:
                </label>
                <input onChange={e => setEndDate(e.target.value)} type="date" className="edit-event-end-date" value={endDate} />
                <div id="edit_trip_buttons">
                    <button id="new-event-submit" type='submit' >Submit Edit Event</button>
                    <button id="new-event-submit" className="cancelEdits" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
export default EditEvent;
