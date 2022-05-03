//import { csrfFetch } from './csrf';

const LOAD_ALL_USER_RELATED_TRIPS = "trip/loadAllUserRelatedTrips"
const LOAD_SINGLE_TRIP = "trip/loadSingleTrip"
const DELETE_TRIP = "trip/deleteTrip"

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators
// actions are just objects

const addTrip = (trip) => {
    return {
        type: LOAD_SINGLE_TRIP,
        payload: trip
    };
}

const loadTrips = (trips) => {
    return {
        type: LOAD_ALL_USER_RELATED_TRIPS,
        payload: trips
    };
};

const deleteTripAction = (id) => {
    return {
        type: DELETE_TRIP,
        payload: id
    };
}

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const newTrip = (newTrip) => async (disptach) => {
    const { ownerId, name, destination, imageUrl, startDate, endDate } = newTrip 
    const response = await fetch('/api/trips/', { // thinking we dont need the trailing slashes
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, name, destination, imageUrl, startDate, endDate })
    });

    if (response.ok) {
        const data = await response.json();
        disptach(addTrip(data))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

export const loadAllUserRelatedTrips = (userId) => async (dispatch) => {
    const res = await fetch(`/api/trips/users/${userId}`)
    // const res = await fetch(`/api/trips/users/${userId}/`) // thinking we dont need the trailing slashes
    if (res.ok) {
        const trips = await res.json();
        dispatch(loadTrips(trips))
    }
}

export const editTrip = (editedTrip) => async (dispatch) => {
    console.log("THIS IS EDITED TRIP STORE------", editedTrip)

    const id = parseInt(editedTrip.id, 10)

    console.log("THIS IS ID--------", id)

    const res = await fetch(`/api/trips/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedTrip)
    });

    console.log("THIS IS RES", res)

    if(res.ok) {
        const trip = await res.json()
        console.log("STORE TRIP--------", trip)
        dispatch(addTrip(trip))

    }
}

export const deleteTrip = (idString) => async (dispatch) => {
    const id = parseInt(idString, 10)
    const res = await fetch(`/api/trips/${id}`)

    if(res.ok) {
        dispatch(deleteTripAction(id))
    }
}





// end of thunks
/////////////////////////////////////////
// reducer


const initialState = {};
const tripsReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_SINGLE_TRIP:
            newState[action.payload.id] = action.payload
            return newState
        case LOAD_ALL_USER_RELATED_TRIPS:
            newState = action.payload
            return newState
            // assumes incoming trips are flattened
        case DELETE_TRIP:
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}


export default tripsReducer;