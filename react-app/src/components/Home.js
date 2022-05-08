import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import TripCard from "./TripCard";
import * as tripActions from "../store/trip"
import * as invitedUsersActions from "../store/invited_user"

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const tripsObj = useSelector(state => state.trips)
    const trips = Object.values(tripsObj)
    const [invitedUserTrips, setinvitedUserTrips] = useState();


    // const invitedUsersObj = useSelector(state => state.invited)
    // const invitedUsers = Object.values(invitedUsersObj)

    // console.log("THIS IS INVITED USERS FOR FRONTED------", invitedUsers)

    // console.log("THIS IS INvited USERS-----------", invitedUsers)

    // const singleInvitedUser = invitedUsers.filter(invitedUser => invitedUser.id === sessionUser.id) 

    //have a store and backend route for all trips 

        // console.log("THIS IS INvited USERS-----------", invitedUsers)

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(`/api/invited_users/${sessionUser.id}/trips`);
    //         const responseData = await response.json();
    //         const allTrips = Object.values(responseData)
    //         console.log("THIS IS ALL OF THE TRIPS THAT EXISTS-------------", allTrips)
    //         // console.log("THIS IS ALL OF THE TRIPS THAT EXISTS-------------", responseData)
    //         setinvitedUserTrips(allTrips);
    //     }
    //     fetchData();
    //     }, []);
    
    // useEffect(() => {
    //     if(sessionUser.id) {
    //         dispatch(invitedUsersActions.loadInvitedUsers(sessionUser.id))
    //     }
    // }, [sessionUser.id])

    

    // console.log("THIS IS INVITED USER TRIPS IN THE FRONT END-----------------------", invitedUsers)

    // const invitedUsersObj = useSelector(state => state.invited)
    // const invitedUsers = Object.values(invitedUsersObj)

    // const singleInvitedUser = invitedUsers.filter(invitedUser => invitedUser.id === sessionUser.id) 
    
        // have a store and backend route for all trips 
        // check id of trip with id of session
        // query in the backend user, get the id then user.invited_trips
        // then get all trips 
        // then display the trips

    
    useEffect(() => {
        if (!sessionUser) history.push('/')
        if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    }, [sessionUser])

    return (
        <div className="page-container">
            <h1 id="all-trips"> All Trips </h1>
            <div className="trip-gallery">
                {/* {invitedUserTrips && invitedUserTrips.map(invitedUserTrip => 
                        <TripCard key={invitedUserTrip.id} trip={invitedUsertrip} />
                    // <li key={invitedUserTrip.id}>  
                    //     {invitedUserTrip.name}
                    // </li>
                )} */}
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
