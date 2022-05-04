import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as noteActions from "../../store/note";
import * as tripActions from "../../store/trip";
import "./individualPage.css";
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

    useEffect(() => {
        if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    },[sessionUser])

    useEffect(() => {
        if (sessionUser) dispatch(noteActions.getNotes(tripId))
    },[sessionUser])

    useEffect(() => {
        let errors = [];

        if(!note.length) errors.push("Please enter Note text.")
        setErrors(errors)

    }, [note])

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
    
    return (
        <>
        <h1>INDIVIDUAL PAGE</h1>
        <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
        {notes &&
            notes.map(note => (
                <li key={note.id}>
                    {note.note}
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