import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import * as invitedUsersActions from "../../store/invited_user"
import * as noteActions from "../../store/note";
import * as tripActions from "../../store/trip";
import * as eventActions from "../../store/event";
import { useHistory } from "react-router-dom";
import TripDateCard from "./TripDateCard";
import { TripContext } from '../../context/Trip';
import NoteFormModal from "../NoteModal";
import DeleteNote from "../NoteModal/DeleteNoteForm";
import { Modal } from "../../context/Modal";
// import "./individualPage.css";

function IndividualTrip() {
    const dispatch = useDispatch()
    const { tripId } = useParams()
    const trip = useSelector(state => state.trips[tripId]);
    const { currentTrip, setCurrentTrip } = useContext(TripContext);
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const notesObj = useSelector(state => state.notes)
    const notes = Object.values(notesObj)
    const eventsObj = useSelector(state => state.events)
    const [showNoteForm, setShowNoteForm] = useState(false)
    const [note, setNote] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [tripDate, setTripDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [stringStartDate, setStringStartDate] = useState("")
    const [stringEndDate, setStringEndDate] = useState("")

     // ------------------------THIS IS FOR THE USER -----------------------------------

    const invitedUsersObj = useSelector(state => state.invited)
    const invitedUsers = Object.values(invitedUsersObj)
    const [errorsAddedUser, setErrorsAddedUser] = useState([]);
    const [showAddedUserForm, setAddedUserForm] = useState(false)
    const [userName, setUserName] = useState("")
    const [tripDates, setTripDates] = useState([]);
    const [events, setEvents] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        console.log('events after setEvents from OBJ',events)
    }, [eventsObj])

    useEffect(() => {
        if (!sessionUser) history.push('/')
    },[sessionUser])

    useEffect(() => {
        let errors = [];
        if (!note.length) errors.push("Please enter Note text.")
        setErrors(errors)
    }, [note])

    useEffect(() => {
        let errorsAddedUser = [];
        if (!userName.length) errorsAddedUser.push("Please enter a user.")
        //errors for not finding a user in the database so need a useSelector for all users so might need a store for users maybe
        setErrorsAddedUser(errorsAddedUser)
    }, [userName])

    useEffect(() => {
        if (trip) {
            itineraryMaker(trip.startDate, trip.endDate);
            // const startDate = trip.startDate.getUTCMonth() + 1
            // const day = trip.startDate.getUTCDate()
            // const year = trip.startDate.getUTCFullYear();
            const startDate = trip.startDate.slice(0,17)
            const endDate = trip.endDate.slice(0,17)
            setStringStartDate(startDate)
            setStringEndDate(endDate)
            //console.log("LOOK HERE---------", trip.startDate)
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
        //console.log('trip dates----------', tripDates)
    }

    const eventFilter = (tripDate) => {
        // console.log('are threr even evnts in here',events)
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
        // console.log('this is daily events func', dailyEvents)
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
                {notes && notes.map(note =>
                    <div key={note.id} className="note-container" >
                        <div className="dialogbox">
                            <div className="body">
                                <span className="tip tip-down"></span>
                                <div className='message'>{note.note}</div>
                            </div>
                        </div>
                        <button className="deleteNoteButton" onClick={e => setShowDeleteModal(true)}>Delete Note</button>
                        {showDeleteModal && (
                            <Modal onClose={() => setShowDeleteModal(false)}>
                                <DeleteNote hideModal={() => setShowDeleteModal(false)} note={note} />
                            </Modal>
                        )}
                    </div>
                )}
                < NoteFormModal />
                {tripDates && tripDates.map(tripDate => (
                    <TripDateCard key={tripDate} events={eventFilter(tripDate)} notes={notes} tripDate={tripDate} />
                    ))}
            </div>
        </div>
        </>
    )
}

export default IndividualTrip
