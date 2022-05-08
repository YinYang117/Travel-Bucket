import { useDispatch } from "react-redux";
import { removeNote, getTripNotes } from '../../store/note';
import React, { useState, useEffect, useContext } from "react";
import "./DeleteNoteModal.css";

function DeleteNote({ hideModal, note }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e, note) => {
        e.preventDefault();
        setErrors([]);
        //console.log("THIS IS NOTE-------->", note)
        dispatch(removeNote(note.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        hideModal();
    }

    const handleCancelClick = (e) => {
        e.preventDefault()
        hideModal();
    };

    return (
        <div className="formContainer7">
            <form id="delete_note_form" onSubmit={e => handleSubmit(e, note)}>
                <h3>Are you sure you want to delete your <span id="delete_note_name">{note.name}</span> Note?</h3>
                <div id="delete_note_buttons">
                    <button id="delete" className="deleteButton" type="submit">Confirm Delete</button>
                    <button id="delete" className="cancelDelete" onClick={handleCancelClick}>Cancel</button>
                    <ul className="new-trip-errors">
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default DeleteNote;
