//import { csrfFetch } from './csrf';

const ADD_TRIP = "trip/loadTrip"

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators
// actions are just objects

const addTrip = (trip) => {
    return {
        type: ADD_TRIP,
        payload: trip
    };

}

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const newTrip = (newTrip) => async (disptach) => {
    console.log("NEWTRIP-----------", newTrip)
    const { ownerId, name, destination, imageUrl, startDate, endDate } = newTrip
    const response = await fetch('/api/trips/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { ownerId, name, destination, imageUrl, startDate, endDate }
        )
    });
    console.log("BODY----------", response)

    if (response.ok) {
        const data = await response.json();
        console.log("DATA---------", data)

        disptach(addTrip(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }


}


// end of thunks
/////////////////////////////////////////
// reducer


const initialState = {};
const tripsReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case ADD_TRIP:
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}

export default tripsReducer;
