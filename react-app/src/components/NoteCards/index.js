import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Modal } from "../../context/Modal";
import NewNoteForm from "./NewNoteForm";
import SingleNote from "./SingleNote"


function TripNotes() {
  const notesObj = useSelector(state => state.notes)
  const notes = Object.values(notesObj)
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="addNoteButton" onClick={() => setShowModal(true)}>
        Add Notes to this Trip
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewNoteForm closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
      {notes && notes.map(note =>
        <SingleNote key={note.id} note={note}/>
      )}
    </>
  );
}

export default TripNotes;
