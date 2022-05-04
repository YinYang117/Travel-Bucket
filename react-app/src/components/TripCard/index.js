import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal"
import DeleteTripForm from "./deleteTripForm"
import EditTripForm from "./editTripForm"
import "./TripCard.css"


function TripCard ({trip}) {
    // trip ^ needs {} 
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    return (
       <>
            <div>{trip.name}</div>
            <div>{trip.destination}</div>
            <NavLink to={`/trips/${trip.id}`}>
                <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
            </NavLink>
            <div>{trip.startDate}</div>
            <div>{trip.endDate}</div>
            <button onClick={e => setShowEditModal(!showEditModal)}>Edit</button>
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditTripForm  hideModal={() => setShowEditModal(false)} trip={trip} />
                </Modal>
            )}
            <button onClick={e => setShowDeleteModal(true)}>Delete Trip</button>
            {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                    <DeleteTripForm  hideModal={() => setShowDeleteModal(false)} trip={trip} />
                </Modal>
            )}
       </> 
    )
}

export default TripCard;