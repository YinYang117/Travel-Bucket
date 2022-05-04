import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import * as tripActions from "../../store/trip"

function IndividualTrip () {
    const dispatch = useDispatch()
    const {tripId}= useParams()
    const trip = useSelector(state => state.trips[tripId])
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
     },[sessionUser])
    
    return (
        <>
        <h1>INDIVIDUAL PAGE</h1>
        <img src={trip?.imageUrl} alt={`${trip?.name} alt`} className="image"/>

        </>
    )
}

export default IndividualTrip