import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import TripCard from "./TripCard";
import * as tripActions from "../store/trip"

function Home() {
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

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    useEffect(() => {
       if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    },[sessionUser])


    const submitNewTrip = () => {
        const newTripData = {};
        setErrors([]);
        setOwnerId(sessionUser.id)
        newTripData.ownerId = ownerId
        newTripData.name = name
        newTripData.destination = destination
        newTripData.imageUrl = imageUrl
        newTripData.startDate = startDate
        newTripData.endDate = endDate

        dispatch(tripActions.newTrip(newTripData))
            // .then(() => history.push('/Home'))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // });
    };

    return (
        <>
            <h1> All Trips </h1>
            {trips &&
            trips.map(trip =>
              <TripCard key={trip.id} trip={trip} />
                )
            }
        </>
    );
}
export default Home;
