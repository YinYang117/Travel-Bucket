import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from "../../store/events";


function Event() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const eventsObj = useSelector(state => state.eventss)
    const events = Object.values(eventsObj)


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
    }, [sessionUser])


    const submitNewEvent = () => {
        const newEventData = {};
        setErrors([]);
        setOwnerId(sessionUser.id)
        newEventData.ownerId = ownerId
        newEventData.tripId = tripId
        newEventData.name = name
        newEventData.description = description
        newEventData.imageUrl = imageUrl
        newEventData.location = location
        newEventData.startDate = startDate
        newEventData.endDate = endDate

        dispatch(eventActions.newEvent(newEventData))

    };


    const deleteEvent = () => {
        setErrors([]);

        dispatch(eventActions.deleteEvent(event.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }


    return (
        <>
            <h1> All Events </h1>
            {events}

        </>
    );
}
export default Event;
