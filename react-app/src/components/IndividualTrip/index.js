import React, { useState, useEffect, useContext } from "react";
import { TripContext } from '../../context/Trip';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as invitedUsersActions from "../../store/invited_user"
import * as noteActions from "../../store/note";
import * as tripActions from "../../store/trip";
import * as eventActions from "../../store/event";
import TripDateCard from "./TripDateCard";
import TripNotes from "../NoteCards"
import { Modal } from "../../context/Modal";
// import "./individualPage.css";
// Why is this ^ commented out?

function IndividualTrip() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { tripId } = useParams()
    
    const trip = useSelector(state => state.trips[tripId]);
    const sessionUser = useSelector(state => state.session.user);
    const eventsObj = useSelector(state => state.events)

    const { setCurrentTrip } = useContext(TripContext);

    const [stringStartDate, setStringStartDate] = useState("")
    const [stringEndDate, setStringEndDate] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

     // ------------------------THIS IS FOR THE USER -----------------------------------

    const invitedUsersObj = useSelector(state => state.invited)
    const invitedUsers = Object.values(invitedUsersObj)
    const [errorsAddedUser, setErrorsAddedUser] = useState([]);
    const [showAddedUserForm, setAddedUserForm] = useState(false)
    const [userName, setUserName] = useState("")
    const [tripDates, setTripDates] = useState([]);
    const [events, setEvents] = useState([]);


    useEffect(() => {
        if (!sessionUser) history.push('/')
    },[sessionUser])
    
    useEffect(() => {
        if(tripId) {
            dispatch(tripActions.loadATrip(tripId))
            dispatch(invitedUsersActions.loadInvitedUsers(tripId))
            dispatch(noteActions.getTripNotes(tripId))
            dispatch(eventActions.loadAllEvents(tripId))
        }
    }, [tripId])

    useEffect(() => {
        setEvents(Object.values(eventsObj))
    }, [eventsObj])

    useEffect(() => {
        let errorsAddedUser = [];
        if (!userName.length) errorsAddedUser.push("Please enter a user.")
        //errors for not finding a user in the database so need a useSelector for all users so might need a store for users maybe
        setErrorsAddedUser(errorsAddedUser)
    }, [userName])

    useEffect(() => {
        if (trip) {
            itineraryMaker(trip.startDate, trip.endDate);
            const startDate = trip.startDate.slice(0,17)
            const endDate = trip.endDate.slice(0,17)
            setStringStartDate(startDate)
            setStringEndDate(endDate)
            setCurrentTrip(trip);
        }
    }, [trip])

    const submitUser = () => {
        setHasSubmitted(true)
        if (errorsAddedUser.length > 0) return;
        const addingUser = {}
        addingUser.tripId = tripId
        addingUser.userName = userName
        dispatch(invitedUsersActions.postInvitedUsers(addingUser))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    };

    const deleteInvitedUser = (user) => {
        setErrors([]);
        dispatch(invitedUsersActions.removeInvitedUsers(user.id,tripId))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }

    const itineraryMaker = (tripStart, tripEnd) => {
        let endDate = new Date(tripEnd);
        let itinerary = [];
        for (let currentDate = new Date(tripStart); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            itinerary.push(new Date(currentDate));
        }
        setTripDates(itinerary);
    }

    const eventFilter = (tripDate) => {
        let dailyEvents = []
        events.forEach(event => {
            let eventEndDate = new Date(event.endDate)
            let eventStartDate = new Date(event.startDate)
            if (eventStartDate.getMonth() === tripDate.getMonth() && eventStartDate.getDate() === tripDate.getDate()) {dailyEvents.push(event)}
            else if (eventEndDate.getMonth() === tripDate.getMonth() && eventEndDate.getDate() === tripDate.getDate()) dailyEvents.push(event)
            else if (eventStartDate < tripDate && eventEndDate > tripDate) {
                let currentDay = new Date(eventStartDate)
                while (currentDay <= eventEndDate) {
                    currentDay.setDate(currentDay.getDate() + 1)
                    if (currentDay.getMonth() === tripDate.getMonth() && currentDay.getDate() === tripDate.getDate()) dailyEvents.push(event)
                }
            }
        })
        return dailyEvents
    }


    return (
        <>
        <div className="individual-trip">
            <div className="center-trip">
                <div style={{ backgroundImage: `url(${trip?.imageUrl})` }} className="background-image-trip">
                    <div className="trip-box">
                        <h1>{trip?.name}</h1>
                        <h2 id="destination-name">{trip?.destination}</h2>
                        <h3>{stringStartDate} to {stringEndDate}</h3>
                        {/* <button className="addUser" onClick={e => setAddedUserForm(!showAddedUserForm)}>Add User</button> */}
                    </div>
                </div>
                <div>
                    <button className="adduser" onClick={e => setAddedUserForm(!showAddedUserForm)}>Invite A User To Your Trip!</button>
                </div>
                {invitedUsers && invitedUsers.map(user =>
                    <li key={user.id}>
                        {user?.username}
                        <button onClick={e => deleteInvitedUser(user)}>Delete User</button>
                    </li>
                )
                }
                { showAddedUserForm &&
                    <form
                    className="new-note-form"
                    onSubmit={e => {
                        e.preventDefault();
                        submitUser();
                    }}>
                        <ul className="new-note-errors">
                        {hasSubmitted && errorsAddedUser.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className="addUserDiv">
                            <input onChange={e => setUserName(e.target.value)} type="text" className="add-user" placeholder="Type username here..." value={userName} />
                            <button className="add-user-submit" type='submit' >Submit User</button>
                        </div>
                    </form>
                }
                <TripNotes />
                {tripDates && tripDates.map(tripDate => (
                    <TripDateCard key={tripDate} events={eventFilter(tripDate)} tripDate={tripDate} />
                    ))}
            </div>
        </div>
        </>
    )
}

export default IndividualTrip
