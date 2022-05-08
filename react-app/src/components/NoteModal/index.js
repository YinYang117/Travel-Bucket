import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NoteForm from "./NoteForm";

function NoteFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="addTripButton" onClick={() => setShowModal(true)}>
        Add A Note
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default NoteFormModal;
