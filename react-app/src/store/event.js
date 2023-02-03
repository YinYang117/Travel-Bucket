const LOAD_ALL_EVENTS = "event/loadAllEvents"
const LOAD_SINGLE_EVENT = "event/loadSingleEvent"
const DELETE_EVENT = "event/deleteEvent"

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators

const addEvent = (event) => {
    return {
        type: LOAD_SINGLE_EVENT,
        payload: event
    };
}

const loadEvents = (events) => {
    return {
        type: LOAD_ALL_EVENTS,
        payload: events
    };
};

const deleteEventAction = (id) => {
    return {
        type: DELETE_EVENT,
        payload: id
    };
}

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const newEvent = (newEvent) => async (disptach) => {
    const { ownerId, tripId, name, description, imageUrl, location, startDate, endDate } = newEvent
    const response = await fetch('/api/events/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, tripId, name, description, imageUrl, location, startDate, endDate })
    });

    if (response.ok) {
        const data = await response.json();
        disptach(addEvent(data))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

export const loadAllEvents = (tripId) => async (dispatch) => {
    const res = await fetch(`/api/trips/${tripId}/events`)
    if (res.ok) {
        const events = await res.json();
        dispatch(loadEvents(events))
    }
}

export const editEvent = (newEvent) => async (dispatch) => {
    const id = parseInt(newEvent.id, 10)
    const res = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent)
    });

    if(res.ok) {
        const data = await res.json()
        dispatch(addEvent(data))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

export const deleteEvent = (id) => async (dispatch) => {
    const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
    })

    if(res.ok) {
        dispatch(deleteEventAction(id))
    }
    else return ['An error occurred. Please try again.']
}

// end of thunks
/////////////////////////////////////////
// reducer

const initialState = {};
const eventsReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case LOAD_SINGLE_EVENT:
            newState[action.payload.id] = action.payload
            return newState
        case LOAD_ALL_EVENTS:
            newState = action.payload
            return newState
        case DELETE_EVENT:
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}

export default eventsReducer;
