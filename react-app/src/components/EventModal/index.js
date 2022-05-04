import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EventForm from "./EventForm";

function EventFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="EventButton" onClick={() => setShowModal(true)}>
        {/* <i class="fa-solid fa-right-to-bracket"></i> */}
        Add a Event
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EventForm />
        </Modal>
      )}
    </>
  );
}

export default EventFormModal;
