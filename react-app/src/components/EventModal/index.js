import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EventForm from "./EventForm";

function EventFormModal() {
    const [showModal, setShowModal] = useState(false);
    const eventsObj = useSelector(state => state.events)
    const events = Object.values(eventsObj)

    return (
        <>
            <h1> All Events </h1>
            <h1> All Events </h1>
            <h1> All Events </h1>
            <h1> All Events </h1>
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
                    <div key={event.id}> {event.name}  </div>
                )
            }



        </>
    );
}

export default EventFormModal;
