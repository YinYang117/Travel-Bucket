import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signUpButton" onClick={() => setShowModal(true)}>
        {/* <i class="fa-solid fa-right-to-bracket"></i> */}
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
