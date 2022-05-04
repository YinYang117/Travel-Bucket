import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import * as noteActions from "../../store/note";
import * as tripActions from "../../store/trip";
// import "./individualPage.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function IndividualTrip () {
    const dispatch = useDispatch()
    const {tripId}= useParams()
    const trip = useSelector(state => state.trips[tripId])
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const notesObj = useSelector(state => state.notes)
    const notes = Object.values(notesObj)

    const [showNoteForm, setShowNoteForm] = useState(false)
    const [note, setNote] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [tripDate, setTripDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [errorsAddedUser, setErrorsAddedUser] = useState([]);
    const [showAddedUserForm, setAddedUserForm] = useState(false)
    const [user, setUser] = useState("")
    const [showingUsers, setShowingUsers] = useState([]);

    useEffect(() => {
        if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    },[sessionUser])

    useEffect(() => {
        if (sessionUser) dispatch(noteActions.getNotes(tripId))
    },[sessionUser])


    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setShowingUsers(responseData.users);
      }
      fetchData();
    }, []);

    useEffect(() => {
        let errors = [];

        if(!note.length) errors.push("Please enter Note text.")
        setErrors(errors)

    }, [note])


    // ------------------------THIS IS FOR THE USER -----------------------------------

    useEffect(() => {
        let errorsAddedUser = [];

        if(!user.length) errorsAddedUser.push("Please enter a user.")
        //errors for not finding a user in the database so need a useSelector for all users so might need a store for users maybe
        setErrorsAddedUser(errorsAddedUser)

    }, [user])



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
            // });

    };

// ------------------------THIS IS FOR THE USER -----------------------------------
    
    const submitUser = () => {
        setHasSubmitted(true)
        if(errorsAddedUser.length > 0) return; 
  
        // const addingUser = {}
        // addingUser.note = note
        // addingUser.tripId = tripId
        // // noteData.tripDate = tripDate
        // addingUser.ownerId = trip.ownerId
        
        // console.log("THIS IS NOTE DATA", noteData)
        

        // dispatch(noteActions.postNote(noteData))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // });

    };

    const deleteNote = (note) => {
        setErrors([]);
        console.log("THIS IS NOTE-------->", note)
        dispatch(noteActions.removeNote(note.id))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }
    
    return (
        <>
        <h1>INDIVIDUAL PAGE</h1>
        <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
        {showingUsers &&
            showingUsers.map(user =>
              <li key={user.id}>
                {user.username}
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
                <input onChange={e => setUser(e.target.value)} type="text" className="add-user" placeholder="Add user here..." value={user} />
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
        </>
    )
}

export default IndividualTrip