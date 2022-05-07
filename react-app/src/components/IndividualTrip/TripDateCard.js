import React, { useState, useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import EventForm from "../EventModal/EventForm";
import EditEvent from "../EventModal/EditEventForm";
import DeleteEvent from "../EventModal/DeleteEventForm";
import { TripContext } from '../../context/Trip';


function TripDateCard({ events, notes, tripDate }) {
    const { currentTrip, setCurrentTrip } = useContext(TripContext);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
  
    return (
        <>
            <div>
                <h1>This is a Trip date Card</h1>
                <div>{tripDate?.getUTCMonth() + 1}, {tripDate?.getUTCDate()}</div>
                {events &&
                    events.map(event =>
                        <div key={event.id}>
                            <div>{event.name}</div>
                            <div>{event.description}</div>
                            <button onClick={e => setShowEditModal(!showEditModal)}>Edit</button>
                            {showEditModal && (
                                <Modal onClose={() => setShowEditModal(false)}>
                                    <EditEvent closeModal={() => setShowEditModal(false)} event={event} />
                                </Modal>
                            )}
                            <button onClick={e => setShowDeleteModal(true)}>Delete Event</button>
                            {showDeleteModal && (
                                <Modal onClose={() => setShowDeleteModal(false)}>
                                    <DeleteEvent hideModal={() => setShowDeleteModal(false)} event={event} />
                                </Modal>
                            )}
                        </div>
                    )
                }
                <button className="EventButton" onClick={() => setShowModal(!showModal)}>
                    {/* <i class="fa-solid fa-right-to-bracket"></i> */}
                    Add a Event
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EventForm closeModal={() => setShowModal(false)} />
                    </Modal>
                )}
            </div>
        </>
    )
}

export default TripDateCard;
