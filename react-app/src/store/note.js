//import { csrfFetch } from './csrf';

const LOAD_NOTES = "note/loadNotes"
const POST_NOTE = "note/postNote"
const DELETE_NOTE = "note/deleteNote"

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators
// actions are just objects

const addNote = (note) => {
    return {
        type: POST_NOTE,
        payload: note
    };
}

const loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        payload: notes
    };
};

const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        payload: id
    };
}

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const postNote = (postNote) => async (disptach) => {
    const { ownerId, tripId, note } = postNote
    // Need to add tripDate above
    const response = await fetch(`/api/notes/`, { // thinking we dont need the trailing slashes
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, tripId, note })
    });

    if (response.ok) {
        const data = await response.json();
        disptach(addNote(data))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

export const getNotes = (tripId) => async (dispatch) => {
    const res = await fetch(`/api/notes/trips/${tripId}`)
    // const res = await fetch(`/api/trips/users/${userId}/`) // thinking we dont need the trailing slashes
    if (res.ok) {
        const trips = await res.json();
        dispatch(loadNotes(trips))
    }
}

// export const editNote = (editedNote) => async (dispatch) => {
//     console.log("THIS IS EDITED TRIP STORE------", editedNote)

//     const id = parseInt(editedNote.id, 10)

//     console.log("THIS IS NOTE ID--------", id)

//     const res = await fetch(`/api/notes/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(editedNote)
//     });

//     console.log("THIS IS RES", res)

//     if(res.ok) {
//         const note = await res.json()
//         console.log("STORE TRIP--------", note)
//         dispatch(addNote(note))

//     }
// }

export const removeNote = (idString) => async (dispatch) => {
    const id = parseInt(idString, 10)
    const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
    })

    if(res.ok) {
        dispatch(deleteNote(id))
    }
}





// end of thunks
/////////////////////////////////////////
// reducer


const initialState = {};
const notesReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case POST_NOTE:
            newState[action.payload.id] = action.payload
            return newState
        case LOAD_NOTES:
            newState = action.payload
            return newState
            // assumes incoming trips are flattened
        case DELETE_NOTE:
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}


export default notesReducer;
