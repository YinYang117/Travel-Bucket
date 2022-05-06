import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import * as invitedUsersActions from "../../store/invited_user"
import * as noteActions from "../../store/note";
import * as tripActions from "../../store/trip";
import * as eventActions from "../../store/event";
import { NavLink, useHistory } from "react-router-dom";
import TripDateCard from "./TripDateCard";
import { TripContext } from '../../context/Trip';
// import "./individualPage.css";

function IndividualTrip () {
    const dispatch = useDispatch()
    const {tripId}= useParams()
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

    const invitedUsers = useSelector(state => state.invited.users)
    // console.log("THIS IS INVITED USERS-------------", invitedUsers)
    // const invitedUsers = Object.values(invitedUsersObj)
    const [errorsAddedUser, setErrorsAddedUser] = useState([]);
    const [showAddedUserForm, setAddedUserForm] = useState(false)
    const [userName, setUserName] = useState("")
    const [tripDates, setTripDates] = useState([]);
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        setEvents(Object.values(eventsObj))
    },[eventsObj])


    useEffect(() => {
        dispatch(invitedUsersActions.loadInvitedUsers(tripId))
        dispatch(noteActions.getNotes(tripId))
        dispatch(eventActions.loadAllEvents(tripId))
    },[sessionUser])
    



 // ------------------------THIS IS FOR THE USER -----------------------------------

    // useEffect(() => {
    //   async function fetchData() {
    //     const response = await fetch(`/api/trips/${tripId}/users`);
    //     const responseData = await response.json();
    //     setShowingUsers(responseData.users);
    //   }
    //   fetchData();
    // }, []);

    useEffect(() => {
        let errors = [];

        if(!note.length) errors.push("Please enter Note text.")
        setErrors(errors)

    }, [note])

    // ------------------------THIS IS FOR THE USER -----------------------------------

    useEffect(() => {
        let errorsAddedUser = [];

        if(!userName.length) errorsAddedUser.push("Please enter a user.")
        //errors for not finding a user in the database so need a useSelector for all users so might need a store for users maybe
        setErrorsAddedUser(errorsAddedUser)

    }, [userName])

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    useEffect(() => {
        itineraryMaker(trip?.startDate, trip?.endDate);
        setCurrentTrip(trip);
    },[trip])

    const submitNote = () => {
        setHasSubmitted(true)
        if(errors.length > 0) return; 
  
        const noteData = {}
        noteData.note = note
        noteData.tripId = tripId
        // noteData.tripDate = tripDate
        noteData.ownerId = trip.ownerId
        
        console.log("THIS IS NOTE DATA", noteData)
        
        dispatch(noteActions.postNote(noteData))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // })
    };

// ------------------------THIS IS FOR THE USER -----------------------------------

    // const gettingUserId = () => {
    //     for(let i = 0; i < showingUsers.length; i++) {
    //         let eachUser = showingUsers[i]
    //         if (eachUser["username"] === user) {
    //             console.log(eachUser["id"])
    //             return eachUser["id"]
    //         }
    //     }
    // }
    // gettingUserId()
    
    const submitUser = () => {
        setHasSubmitted(true)
        if(errorsAddedUser.length > 0) return; 

        // console.log("THIS IS SHOWING USERS-----------------", showingUsers)
        // [{}, {}]
        // { "email": "demo@aa.io","id": 1,"username": "Demo"}
        // user = username of the user that you want to add to your trip 
  
        const addingUser = {}
        // addingUser.userId = username.actualUserId
        addingUser.tripId = tripId
        addingUser.userName = userName
        // noteData.tripDate = tripDate

        // console.log("THIS IS SUBMITTED USER-------------------------", user)
        console.log("THIS IS TRIP ID-------------------------", tripId)
        console.log("THIS IS ADDING USER DATA------------------", addingUser)
        dispatch(invitedUsersActions.postInvitedUsers(addingUser))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // });
    };

    const deleteInvitedUser = (user) => {
        setErrors([]);
        dispatch(invitedUsersActions.removeInvitedUsers(user.id))
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

    return (
        <>
        <h1>INDIVIDUAL PAGE</h1>
        <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
        {invitedUsers &&
            invitedUsers.map(user =>
              <li key={user.id}>
                {user?.username}
                <button onClick={e => deleteInvitedUser(user)}>Delete User</button>
              </li>
        )
        }
        <button onClick={e => setAddedUserForm(!showAddedUserForm)}>Add User</button>
        { showAddedUserForm && <form 
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
        {notes &&
            notes.map(note => (
                <li key={note.id}>
                    {note.note}
                    <button onClick={e => deleteNote(note)}>Delete</button>
                </li>
            ))
        }
        <button onClick={e => setShowNoteForm(!showNoteForm)}>Add Note</button>
        { showNoteForm && <form 
                className="new-note-form"
                onSubmit={e => {
                    e.preventDefault();
                    submitNote();
                }}>
                <label className='label'>
                    Note:
                </label>
                <input onChange={e => setNote(e.target.value)} type="text" className="new-note-text" placeholder="Add note text here..." value={note} />
                <ul className="new-note-errors">
                    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <button className="new-note-submit" type='submit' >Submit Note</button>
            </form>
        }
        { tripDates && tripDates.map(tripDate => (
            <TripDateCard key={tripDate} events={events} notes={notes} tripDate={tripDate}/>
        )) }
        </>
    )
}

export default IndividualTrip