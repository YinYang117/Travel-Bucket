import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as noteActions from "../../store/note";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { TripContext } from '../../context/Trip';
import "./NoteModal.css";

function NoteForm({ closeModal }) {

    const { currentTrip, setCurrentTrip } = useContext(TripContext);
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)




    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

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
        console.log("CUTTENT TRIP-------",currentTrip)

        noteData.tripId = currentTrip.id
        // noteData.tripDate = tripDate
        noteData.ownerId = currentTrip.ownerId

        console.log("THIS IS NOTE DATA", noteData)

        dispatch(noteActions.postNote(noteData))
            .then(() => closeModal())
            // .catch(async (res) => {
            //     const data = await res.json()
            //     if (data && data.errors) setErrors(data.errors)
            // })
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
                <label className='label'>
                    Note:
                </label>
                <input onChange={e => setNote(e.target.value)} type="text" className="new-note-text" placeholder="Add note text here..." value={note} />
                <button id="new-note-submit" type='submit' >Submit Note</button>
            </form>
        </div>
    );
}
export default NoteForm;
