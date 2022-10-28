import React, { useState, useEffect, useContext } from "react";
import { TripContext } from "../../context/Trip";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as invitedUsersActions from "../../store/invited_user";
import { getTripNotes } from "../../store/note";
import { loadATrip } from "../../store/trip";
import { loadAllEvents } from "../../store/event";

import TripDateCard from "./TripDateCard";
import TripNotes from "../NoteCards";
import MapContainer from "../Map";
import "./individualPage.css";

function IndividualTrip() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();

  const trip = useSelector((state) => state.trips[tripId]);
  const sessionUser = useSelector((state) => state.session.user);
  const eventsObj = useSelector((state) => state.events);
  const invitedUsers = useSelector((state) => Object.values(state.invited))

  const { setCurrentTrip } = useContext(TripContext);

  const [stringStartDate, setStringStartDate] = useState("");
  const [stringEndDate, setStringEndDate] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [tripDates, setTripDates] = useState([]);
  const [events, setEvents] = useState([]);

  //  THIS IS FOR INVITED USERS------------
  const [errorsAddedUser, setErrorsAddedUser] = useState([]);
  const [showAddedUserForm, setAddedUserForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchAndSetUsers() {
      const res = await fetch("/api/users/");
      const data = await res.json();
      setUsers(data.users);
    }
    fetchAndSetUsers();
  }, []);

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [history, sessionUser]);

  useEffect(() => {
    if (tripId) {
      dispatch(loadATrip(tripId))
      .then(() => dispatch(invitedUsersActions.loadInvitedUsers(tripId)))
      .then(() => dispatch(getTripNotes(tripId)))
      .then(()=>  dispatch(loadAllEvents(tripId)))
    }
  }, [dispatch, tripId]);

  useEffect(() => {
    setEvents(Object.values(eventsObj));
  }, [eventsObj]);

  useEffect(() => {
    let newErrors = [];
    let existUser = users.filter((user) => user.username === userName);
    if (!userName.length) newErrors.push("Please enter a user.");
    if (!existUser.length) newErrors.push("User does not exist.");
    setErrorsAddedUser(newErrors);
  }, [users, userName]);

  useEffect(() => {
    if (trip) {
      itineraryMaker(trip.startDate, trip.endDate);
      const startDate = trip.startDate.slice(0, 17);
      const endDate = trip.endDate.slice(0, 17);
      setStringStartDate(startDate);
      setStringEndDate(endDate);
      setCurrentTrip(trip);
    }
  }, [trip, setCurrentTrip]);

  const submitUser = () => {
    setHasSubmitted(true);
    if (errorsAddedUser.length > 0) return;
    const addingUser = {};
    addingUser.tripId = tripId;
    addingUser.userName = userName;
    dispatch(invitedUsersActions.postInvitedUsers(addingUser));
  };

  const deleteInvitedUser = (user) => {
    dispatch(invitedUsersActions.removeInvitedUsers(user.id, tripId))
    // TODO research if res should actually be error at this stage? 
    // Thinking ^ because it's in a .catch, instead of .then...  But also there's no try block here...
    .catch( async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          //TODO render error message if this happens, which it shouldn't
        };
      });
  };

  //  itineraryMaker creates JS dates for each day in a trip in state
  const itineraryMaker = (tripStart, tripEnd) => {
    let tripEndDate = new Date(tripEnd);
    let tripDatesHolder = [];
    
    for (
      let validDate = new Date(tripStart);
      validDate <= tripEndDate;
      validDate.setDate(validDate.getDate() + 1)
    ) {
      tripDatesHolder.push(validDate)
    }

    // Sets state as an array of dates
    setTripDates(tripDatesHolder);
  };

  // Filters through all events to pick only events happening on a certain date.
  // Setup to work with multi-day events to set them on each 
  const eventFilter = (tripDate) => {
    let dailyEvents = [];
    events.forEach((event) => {
      let eventEndDate = new Date(event.endDate);
      let eventStartDate = new Date(event.startDate);
      if (
        eventStartDate.getMonth() === tripDate.getMonth() &&
        eventStartDate.getDate() === tripDate.getDate()
      ) {
        dailyEvents.push(event);
      } else if (
        eventEndDate.getMonth() === tripDate.getMonth() &&
        eventEndDate.getDate() === tripDate.getDate()
      )
        dailyEvents.push(event);
      else if (eventStartDate < tripDate && eventEndDate > tripDate) {
        let currentDay = new Date(eventStartDate);
        while (currentDay <= eventEndDate) {
          if (
            currentDay.getMonth() === tripDate.getMonth() &&
            currentDay.getDate() === tripDate.getDate()
          ) dailyEvents.push(event);

          currentDay.setDate(currentDay.getDate() + 1);
        }
      }
    });
    return dailyEvents;
  };

  return (
    <>
      <div className="individual-trip">
        <div className="center-trip">
          <div
            style={{ backgroundImage: `url(${trip?.imageUrl})` }}
            className="background-image-trip"
          >
            <div className="trip-box">
              <h1 className="main-header">{trip?.name}</h1>
              <h2 id="destination-name">{trip?.destination}</h2>
              <h3>
                {stringStartDate} to {stringEndDate}
              </h3>
            </div>
          </div>
          <div>
            <button
              className="adduser"
              onClick={(e) => setAddedUserForm(!showAddedUserForm)}
            >
              Invite A User To Your Trip!
            </button>
          </div>
          {invitedUsers &&
            invitedUsers.map((user) => (
              <div key={user.id}>
                {user?.username}
                <button
                  className="deleteuser"
                  onClick={(e) => deleteInvitedUser(user)}
                >
                  Remove User
                </button>
              </div>
            ))}
          {showAddedUserForm && (
            <form
              className="new-note-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitUser();
              }}
            >
              <ul className="new-note-errors">
                {hasSubmitted &&
                  errorsAddedUser.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
              </ul>
              <div className="addUserDiv">
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  className="add-user"
                  placeholder="Type username here..."
                  value={userName}
                />
                <button className="add-user-submit" type="submit">
                  Submit User
                </button>
              </div>
            </form>
          )}
          <TripNotes />
          <div className="events-and-map">
            <div className="daily-itinerary">
              <h1 className="daily-header">Daily Itinerary</h1>
              <div>
                {tripDates &&
                  tripDates.map((tripDate) => (
                    <TripDateCard
                      key={tripDate}
                      events={eventFilter(tripDate)}
                      tripDate={tripDate}
                    />
                  ))}
              </div>
            </div>
            <div className="map-div">
              <MapContainer tripId={tripId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualTrip;
