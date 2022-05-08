import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import TripCard from "./TripCard";
import * as tripActions from "../store/trip"

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const tripsObj = useSelector(state => state.trips)
    const trips = Object.values(tripsObj)

    // const invitedUsersObj = useSelector(state => state.invited)
    // const invitedUsers = Object.values(invitedUsersObj)

    // console.log("THIS IS INvited USERS-----------", invitedUsers)

    // const singleInvitedUser = invitedUsers.filter(invitedUser => invitedUser.id === sessionUser.id) 

    //have a store and backend route for all trips 

    
    useEffect(() => {
        if (!sessionUser) history.push('/')
        if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    }, [sessionUser])

    return (
        <div className="page-container">
            <h1 id="all-trips"> All Trips </h1>
            <div className="trip-gallery">
                {trips &&
                trips.map(trip =>
                <TripCard key={trip.id} trip={trip} />
                    )
                }
            </div>
        </div>
    );
}
export default Home;
