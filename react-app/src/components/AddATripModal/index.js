import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddATrip from "./AddATrip"

function AddATripModal() {
  const [showModal, setShowModal] = useState(false);
 

  return (
    <>
      <button className="AddATripButton" onClick={() => setShowModal(true)}>
        {/* <i class="fa-solid fa-right-to-bracket"></i> */}
        Add A Trip
      </button>
      {showModal && (
        <Modal onClose={() =>{ 
          setShowModal(false)
        }}>
          <AddATrip />
        </Modal>
      )}
    </>
  );
}

export default AddATripModal;
