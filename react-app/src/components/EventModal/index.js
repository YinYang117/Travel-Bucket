import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EventForm from "./EventForm";
import EditEvent from "./EditEventForm";
import DeleteEvent from "./DeleteEventForm"
import { useSelector } from "react-redux";

function EventFormModal() {
    const eventsObj = useSelector(state => state.events)

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const events = Object.values(eventsObj)

    return (
        <>
            <h1> All Events </h1>
            <button className="EventButton" onClick={() => setShowModal(!showModal)}>
                {/* <i class="fa-solid fa-right-to-bracket"></i> */}
                Add a Event
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EventForm closeModal={() => setShowModal(false)} />
                </Modal>
            )}
            {events &&
                events.map(event =>
                    <>
                        <div key={event.id}>{event.name}</div>
                        <button onClick={e => setShowEditModal(!showEditModal)}>Edit</button>
                        {showEditModal && (
                        <Modal onClose={() => setShowEditModal(false)}>
                            <EditEvent  closeModal={() => setShowEditModal(false)} event={event} />
                        </Modal>
                        )}
                        <button onClick={e => setShowDeleteModal(true)}>Delete Event</button>
                        {showDeleteModal && (
                        <Modal onClose={() => setShowDeleteModal(false)}>
                            <DeleteEvent hideModal={() => setShowDeleteModal(false)} event={event} />
                        </Modal>
                        )}
                    </>
                )
            }
        </>
    );
}

export default EventFormModal;
