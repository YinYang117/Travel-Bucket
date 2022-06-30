import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNote } from "../../store/note";
import "./NoteCards.css";

function DeleteNote({ hideModal, note }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e, note) => {
    e.preventDefault();
    setErrors([]);
    dispatch(removeNote(note.id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    hideModal();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideModal();
  };

  return (
    <div className="formContainer7">
      <form id="delete_note_form" onSubmit={(e) => handleSubmit(e, note)}>
        <h3 id="delete-texts">Are you sure?</h3>
        <div id="delete_note_buttons">
          <button id="delete" className="deleteButton" type="submit">
            Confirm Delete
          </button>
          <button
            id="cancel"
            className="cancelDelete"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <ul className="new-trip-errors">
            {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default DeleteNote;
