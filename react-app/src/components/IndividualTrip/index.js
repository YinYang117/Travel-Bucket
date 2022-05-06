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

     // ------------------------THIS IS FOR THE USER -----------------------------------

    const invitedUsersObj = useSelector(state => state.invited)
    // console.log("THIS IS INVITED USERS-------------", invitedUsers)
    const invitedUsers = Object.values(invitedUsersObj)
    const [errorsAddedUser, setErrorsAddedUser] = useState([]);
    const [showAddedUserForm, setAddedUserForm] = useState(false)
    const [userName, setUserName] = useState("")
    const [tripDates, setTripDates] = useState([]);
    const [events, setEvents] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(tripActions.loadATrip(tripId))
        dispatch(invitedUsersActions.loadInvitedUsers(tripId))
        dispatch(noteActions.getTripNotes(tripId))
        dispatch(eventActions.loadAllEvents(tripId))
    }, [tripId])

    useEffect(() => {
        if (trip) setCurrentTrip(trip)
    }, [trip])

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

    const deleteNote = (note) => {
        setErrors([]);
        console.log("THIS IS NOTE-------->", note)
        dispatch(noteActions.removeNote(note.id))
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
            console.log('event', event)
            console.log('tripDate', tripDate)
            console.log(event.startDate === tripDate)
            if (event.startDate === tripDate) dailyEvents.push(event)
            else if (event.endDate === tripDate) dailyEvents.push(event)
            else if (event.startDate < tripDate && event.endDate > tripDate) {
                let currentDay = event.startDate
                while (currentDay <= event.endDate) {
                    currentDay.setDate(currentDay.getDate() + 1)
                    if (currentDay === tripDate) dailyEvents.push(event)
                }
            }
        })
        console.log('this is daily events func', dailyEvents)
        return dailyEvents
    }

    return (
        <>
            <h1>INDIVIDUAL PAGE</h1>
            <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
            {invitedUsers && invitedUsers.map(user =>
                <li key={user.id}>
                    {user?.username}
                    <button onClick={e => deleteInvitedUser(user)}>Delete User</button>
                </li>
            )
            }
            <button onClick={e => setAddedUserForm(!showAddedUserForm)}>Add User</button>
            { showAddedUserForm && 
                <form
                    className="new-note-form"
                    onSubmit={e => {
                        e.preventDefault();
                        submitUser();
                    }}>
                    <label className='label'>
                        Add a User:
                    </label>
                    <input onChange={e => setUserName(e.target.value)} type="text" className="add-user" placeholder="Add user here..." value={userName} />
                    <ul className="new-note-errors">
                        {hasSubmitted && errorsAddedUser.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <button className="add-user-submit" type='submit' >Submit User</button>
                </form>
            }
            {notes && notes.map(note =>
                <div key={note.id}>
                    <div >{note.note}</div>
                    <button onClick={e => setShowDeleteModal(true)}>Delete Note</button>
                    {showDeleteModal && (
                        <Modal onClose={() => setShowDeleteModal(false)}>
                            <DeleteNote hideModal={() => setShowDeleteModal(false)} note={note} />
                        </Modal>
                    )}
                    < NoteFormModal />
                </div>
            )}
            {tripDates && tripDates.map(tripDate => (
                <TripDateCard key={tripDate} events={eventFilter(events)} notes={notes} tripDate={tripDate} />
            ))}
        </>
    )
}


export default IndividualTrip
