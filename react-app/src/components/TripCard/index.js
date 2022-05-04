import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as tripActions from "../../store/trip"
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./TripCard.css"


function TripCard ({trip}) {
    // does this need curly brackets ???
    const dispatch = useDispatch()
    const history = useHistory()

    const [showEditForm, setShowEditForm] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState(trip?.name);
    const [destination, setDestination] = useState(trip?.destination);
    const [imageUrl, setImageUrl] = useState(trip?.imageUrl);
    const [startDate, setStartDate] = useState(trip?.startDate);
    const [endDate, setEndDate] = useState(trip?.endDate);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])


    const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    useEffect(() => {
        let errors = [];

        if(!(imageUrl.match(url))){
            errors.push("Please enter a valid URL.")
        } else if (!imageUrl.length) {
            errors.push("Please enter a URl.")
        }

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
        
        console.log("THIS IS EDITED TRIP DATA", editedTripData)
        

        dispatch(tripActions.editTrip(editedTripData))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // });

    };

    const deleteTrip = () => {
        setErrors([]);

        dispatch(tripActions.deleteTrip(trip.id))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }





    return (
       <>
            <div>{trip.name}</div>
            <div>{trip.destination}</div>
            <NavLink to={`/trips/${trip.id}`}>
                <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
            </NavLink>
            <div>{trip.startDate}</div>
            <div>{trip.endDate}</div>
            <button onClick={e => setShowEditForm(!showEditForm)}>Edit</button>
            <button onClick={e => deleteTrip()}>Delete</button>
            { showEditForm && <form 
                className="new-trip-form"
                onSubmit={e => {
                    e.preventDefault();
                    submitTripEdits();
                }}>
                <label className='label'>
                    Trip Name:
                </label>
                <input onChange={e => setName(e.target.value)} type="text" className="new-trip-name" placeholder={trip?.name} value={name} />
                <label className='label'>
                    Trip Destination:
                </label>
                <input onChange={e => setDestination(e.target.value)} type="text" className="new-trip-destination" placeholder={trip?.destination} value={destination} />
                <label className='label'>
                    Trip Main Image URL:
                </label>
                <input onChange={e => setImageUrl(e.target.value)} type="text" className="new-trip-image" placeholder={trip?.imageUrl} value={imageUrl} />
                <label className='label'>
                    Trip Start:
                </label>
                <input onChange={e => setStartDate(e.target.value)} type="date" className="new-trip-start-date" placeholder={trip?.startDate} value={startDate} />
                <label className='label'>
                    Trip End:
                </label>
                <input onChange={e => setEndDate(e.target.value)} type="date" className="new-trip-end-date" placeholder={trip?.endDate} value={endDate} />
                <ul className="new-trip-errors">
                    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <button className="new-trip-submit" type='submit' >Submit Trip Edits</button>
            </form>
            }
       </> 
    )
}

export default TripCard;