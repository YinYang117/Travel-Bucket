import { useDispatch } from "react-redux";
import { removeNote, getNotes } from '../../store/note';
import React, { useState, useEffect, useContext } from "react";

function DeleteNote ({ hideModal, note }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (note) => {
        setErrors([]);
        console.log("THIS IS NOTE-------->", note)
        dispatch(removeNote(note.id))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }
    const handleCancelClick = (e) => {
        e.preventDefault()
        hideModal();
    };

    return (
        <form id="delete_note_form" onSubmit={handleSubmit}>
          <h3>Are you sure you want to delete your <span id="delete_note_name">{note.name}</span> Note?</h3>
          <div id="delete_note_buttons">
            <button id="delete" className="deleteButton" type="submit">Confirm Delete</button>
            <button id="cancel" className="cancelDelete" onClick={handleCancelClick}>Cancel</button>
            <ul className="new-trip-errors">
                {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
        </form>
    )
}

export default DeleteNote;