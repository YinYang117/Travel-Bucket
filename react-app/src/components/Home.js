import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import TripCard from "./TripCard";
import AddATripModal from './AddATripModal';
import * as tripActions from "../store/trip"
import * as invitedUsersActions from "../store/invited_user"



function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const tripsObj = useSelector(state => state.trips)
    const trips = Object.values(tripsObj)
    const [invitedUserTrips, setinvitedUserTrips] = useState();

    
    useEffect(() => {
        if (!sessionUser) history.push('/')
        if (sessionUser) dispatch(tripActions.loadAllUserRelatedTrips(sessionUser.id))
    }, [sessionUser])
    //   const libraries = ["places"];

    return (
        <>
            <div className="page-container">
                <h1 id="all-trips"> All Trips </h1>
                <div className="trip-gallery">
                    {trips && trips?.map(trip =>
                        <TripCard key={trip?.id} trip={trip} />
                    )}
                    {(trips?.length === 0) &&
                        <div className="trip-container">
                            <h3 id="no-trip">Plan a Trip Now!</h3>
                            <img id="trip-image" src="/static/travel.png" alt="Where to?" className="image"/>
                            <AddATripModal />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}


// export default React.memo(Mapss);
export default Home;