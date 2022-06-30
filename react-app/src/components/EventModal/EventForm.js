import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from "../../store/event";
import { useHistory } from "react-router-dom";
import { TripContext } from '../../context/Trip';
import './EventModal.css';
//import DateTimePicker from 'react-datetime-picker';
//import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
//import { DateRangePicker } from 'react-date-range';
//import { DateRange } from 'react-date-range';
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";

function Event({closeModal}) {
    const { currentTrip } = useContext(TripContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [ownerId, setOwnerId] = useState(sessionUser?.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    // const [startDate, setStartDate] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    useEffect(() => {
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


    const submitNewEvent = () => {

        setHasSubmitted(true)
        if (errors.length > 0) return;

        const newEventData = {};
        setOwnerId(sessionUser.id)
        newEventData.ownerId = ownerId
        newEventData.tripId = currentTrip.id
        newEventData.name = name
        newEventData.description = description
        newEventData.imageUrl = imageUrl
        newEventData.location = location
        newEventData.startDate = startDate
        newEventData.endDate = endDate

        dispatch(eventActions.newEvent(newEventData))
        .then(() => closeModal())
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })

    };



    return (
        <div className="formContainer4">
            <h1> Add An Event </h1>
            <form
                className="new-event-form"
                onSubmit={e => {
                    e.preventDefault();
                    submitNewEvent();
                }}>
                <ul className="new-event-errors">
                    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='eventlabel'>
                    Event Name:
                </label>
                <input onChange={e => setName(e.target.value)} type="text" className="new-event-name" placeholder='Event Name' value={name} />
                <label className='eventlabel'>
                    Event Description:
                </label>
                <input onChange={e => setDescription(e.target.value)} type="text" className="new-event-description" placeholder='Event Description' value={description} />
                <label className='eventlabel'>
                    Event Location:
                </label>
                <input onChange={e => setLocation(e.target.value)} type="text" className="new-event-location" placeholder='Event Location' value={location} />
                <label className='eventlabel'>
                    Event Image URL:
                </label>
                <input onChange={e => setImageUrl(e.target.value)} type="text" className="new-event-image" placeholder='Image Url' value={imageUrl} />
                <label className='eventlabel'>
                    Event Start:
                </label>
                <DatePicker className="react-date-picker" selected={startDate} value={startDate} minDate={new Date()} onChange={e => setStartDate(new Date(e))} />
                {/* <input onChange={e => setStartDate(e.target.value)} type="date" className="new-event-start-date" value={startDate} /> */}
                <label className='eventlabel'>
                    Event End:
                </label>
                <input onChange={e => setEndDate(e.target.value)} type="date" className="new-event-end-date" value={endDate} />
                <button id="new-event-submit" type='submit' >Submit New event</button>
            </form>
        </div>
    );
}

export default Event;
