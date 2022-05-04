import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as tripActions from "../../store/trip"
import { Redirect } from 'react-router-dom';



function AddATrip() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const tripsObj = useSelector(state => state.trips)
    const trips = Object.values(tripsObj)


    const [ownerId, setOwnerId] = useState(sessionUser?.id);
    const [name, setName] = useState("");
    const [destination, setDestination] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    // useEffect(() => {
    //    if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    // },[sessionUser])
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


    const submitNewTrip = () => {

        setHasSubmitted(true)
        if(errors.length > 0) return; 

        const newTripData = {};
        setOwnerId(sessionUser.id)
        newTripData.ownerId = ownerId
        newTripData.name = name
        newTripData.destination = destination
        newTripData.imageUrl = imageUrl
        newTripData.startDate = startDate
        newTripData.endDate = endDate

       let trip =  dispatch(tripActions.newTrip(newTripData))
        
       if (trip) {

           history.push("/Home")
       }

        // .then(() => history.push('/Home'))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    };

    return (
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
                    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <button className="new-trip-submit" type='submit' >Submit New Trip</button>
            </form>
        </div>
    );
}
export default AddATrip;
