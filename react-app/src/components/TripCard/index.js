import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal"
import { TripContext } from '../../context/Trip';
import DeleteTripForm from "./deleteTripForm";
import EditTripForm from "./editTripForm";
import "./TripCard.css";


function TripCard({ trip }) {
    const { setCurrentTrip } = useContext(TripContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAutoEdit, setShowAutoEdit] = useState(false)

    const submitting = () => {
        setShowEditModal(!showEditModal)
        setShowAutoEdit(true)
    }

    let startDate;
    let endDate;

    if (typeof (trip.startDate) === 'string') {
        startDate = trip.startDate.slice(0, 17);
        endDate = trip.endDate.slice(0, 17);
    }

    return (
        <div className="trip-container">
            <h2 id="trip-name">{trip.name}</h2>
            <h3 id="destination-name">{trip.destination}</h3>
            <NavLink to={`/trips/${trip?.id}`} onClick={setCurrentTrip(trip)}>
                <img id="trip-image" src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image" />
            </NavLink>
            <div className="date-container">
                <div>{startDate}</div>
                <h4>To</h4>
                <div>{endDate}</div>
            </div>
            <div>
                <button className="button5" onClick={submitting}>Edit</button>
                {showEditModal && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditTripForm hideModal={() => setShowEditModal(false)} trip={trip} showAutoEdit={showAutoEdit} />
                    </Modal>
                )}
                <button className="button6" onClick={e => setShowDeleteModal(true)}>Delete Trip</button>
                {showDeleteModal && (
                    <Modal onClose={() => setShowDeleteModal(false)}>
                        <DeleteTripForm hideModal={() => setShowDeleteModal(false)} trip={trip} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default TripCard;
