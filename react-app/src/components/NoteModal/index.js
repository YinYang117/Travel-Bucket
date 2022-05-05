import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NoteForm from "./NoteForm";

function NoteFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="addTripButton" onClick={() => setShowModal(true)}>
        {/* <i class="fa-solid fa-right-to-bracket"></i> */}
        Add Note
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm />
        </Modal>
      )}
    </>
  );
}

export default NoteFormModal;