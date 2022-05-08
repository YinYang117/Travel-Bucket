import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as noteActions from "../../store/note";
import { TripContext } from '../../context/Trip';
import "./NoteCards.css";

function NewNoteForm({ closeModal }) {
    const { currentTrip } = useContext(TripContext);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        let errors = [];
        if(!note.length) errors.push("Please enter a note.")
        setErrors(errors)
    }, [note])

    const submitNote = () => {
        setHasSubmitted(true)
        if (errors.length > 0) return;
        const noteData = {}
        noteData.note = note
        noteData.tripId = currentTrip.id
        // noteData.tripDate = tripDate
        noteData.ownerId = sessionUser.id
        
        dispatch(noteActions.postNewNote(noteData))
        .then(() => closeModal())
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
    };


    return (
        <div className="formContainer8">
            <form
                className="new-note-form"
                onSubmit={e => {
                    e.preventDefault();
                    submitNote();
                }}>
                <ul className="new-note-errors">
                {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='textlabel'>
                    Note:
                </label>
                <input onChange={e => setNote(e.target.value)} type="text" className="new-note-text" placeholder="Add note text here..." value={note} />
                <button id="new-note-submit" type='submit' >Submit Note</button>
            </form>
        </div>
    );
}
export default NewNoteForm;