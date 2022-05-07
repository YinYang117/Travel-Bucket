import React, { useState, useEffect, useContext } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal"
import { TripContext } from '../../context/Trip';
import DeleteTripForm from "./deleteTripForm";
import EditTripForm from "./editTripForm";
import AddATripModal from '../AddATripModal';
import "./TripCard.css";


function TripCard ({trip}) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const { currentTrip, setCurrentTrip } = useContext(TripContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        if (!sessionUser) history.push('/')
    }, [sessionUser])

    let startDate;
    let endDate;
    
    if (typeof(trip.startDate) === 'string') {
        startDate = trip.startDate.slice(0, 17);
        endDate = trip.endDate.slice(0, 17);
        return (
        <div className="trip-container">
                <h2 id="trip-name">{trip.name}</h2>
                <h3 id="destination-name">{trip.destination}</h3>
                <NavLink to={`/trips/${trip.id}`}>
                    <img id="trip-image" src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>
                </NavLink>
                <div className="date-container">
                    <div>{startDate}</div>
                    <h4>To</h4>
                    <div>{endDate}</div>
                </div>
                <div>
                    <button className="button5" onClick={e => setShowEditModal(!showEditModal)}>Edit</button>
                    {showEditModal && (
                        <Modal onClose={() => setShowEditModal(false)}>
                            <EditTripForm  hideModal={() => setShowEditModal(false)} trip={trip} />
                        </Modal>
                    )}
                    <button className="button6" onClick={e => setShowDeleteModal(true)}>Delete Trip</button>
                    {showDeleteModal && (
                        <Modal onClose={() => setShowDeleteModal(false)}>
                            <DeleteTripForm  hideModal={() => setShowDeleteModal(false)} trip={trip} />
                        </Modal>
                    )}
                </div>
        </div>
        )
    } else {
        return (
            <div className="trip-container">
                <h3 id="no-trip">Plan a Trip Now!</h3>
                <img id="trip-image" src="/travel.png" alt="Where to?" className="image"/>
                <AddATripModal/>
            </div>
        )
    }
}

export default TripCard;
