import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as tripActions from "../../store/trip"
import "./TripCard.css"


function TripCard ({trip}) {
    // does this need curly brackets ???
    const dispatch = useDispatch()

    const [showEditForm, setShowEditForm] = useState(false)

    const [name, setName] = useState(trip?.name);
    const [destination, setDestination] = useState(trip?.destination);
    const [imageUrl, setImageUrl] = useState(trip?.imageUrl);
    const [startDate, setStartDate] = useState(trip?.startDate);
    const [endDate, setEndDate] = useState(trip?.endDate);
    const [errors, setErrors] = useState([]);



    const submitTripEdits = () => {
        const editedTripData = trip
        setErrors([]);
        editedTripData.name = name
        editedTripData.destination = destination
        editedTripData.imageUrl = imageUrl
        editedTripData.startDate = startDate
        editedTripData.endDate = endDate
        
        console.log("THIS IS EDITED TRIP DATA", editedTripData)
        

        dispatch(tripActions.editTrip(editedTripData))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

    };





    return (
       <>
            <div>{trip.name}</div>
            <div>{trip.destination}</div>
            <img src={trip.imageUrl} alt={`image for ${trip.name}`} className="image"/>
            <div>{trip.startDate}</div>
            <div>{trip.endDate}</div>
            <button onClick={e => setShowEditForm(!showEditForm)}>Edit</button>
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
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <button className="new-trip-submit" type='submit' >Submit Trip Edits</button>
            </form>
            }
       </> 
    )
}

export default TripCard;