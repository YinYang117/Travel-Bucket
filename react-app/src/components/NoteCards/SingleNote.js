import React, { useState, useEffect, useContext } from "react";
import { TripContext } from '../../context/Trip';
import { useDispatch, useSelector } from 'react-redux';
import * as noteActions from "../../store/note";
import { Modal } from "../../context/Modal";
import NoteForm from "./NewNoteForm";
import DeleteNote from "./DeleteNoteForm"

function SingleNote({note}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div className="note-container" >
            <div className="dialogbox">
                <div className="body">
                    <span className="tip tip-down"></span>
                    <div className='message'>{note.note}</div>
                </div>
            </div>
            <button className="deleteNoteButton" onClick={e => setShowDeleteModal(true)}>Delete Note</button>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteNote hideModal={() => setShowDeleteModal(false)} note={note} />
                </Modal>
            )}
        </div>
    );
}

export default SingleNote;
