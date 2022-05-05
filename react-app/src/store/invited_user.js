//import { csrfFetch } from './csrf';

// const LOAD_INVITED_USERS = "invited_user/loadInvitedUsers"
const POST_INVITED_USERS = "invited_user/postInvitedUsers"
const DELETE_INVITED_USERS = "invited_user/deleteInvitedUsers"

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators
// actions are just objects

const addInvitedUser = (tripAndUser) => {
    return {
        type: POST_INVITED_USERS,
        payload: tripAndUser
    };
}

// const loadInvitedUser = (trips) => {
//     return {
//         type: LOAD_INVITED_USERS,
//         payload: trips
//     };
// };

const deleteInvitedUsers = (id) => {
    return {
        type: DELETE_INVITED_USERS,
        payload: id
    };
}

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const postInvitedUsers = (tripAndUser) => async (disptach) => {
    const {tripId, userId} = tripAndUser
    const response = await fetch('/api/trips/', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({tripId, userId})
    });

    if (response.ok) {
        const data = await response.json();
        disptach(addInvitedUser(data))
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

// export const loadInvitedUsers = (userId) => async (dispatch) => {
//     const res = await fetch(`/api/trips/users/${userId}`)
//     // const res = await fetch(`/api/trips/users/${userId}/`) // thinking we dont need the trailing slashes
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(loadInvitedUsers(data))
//     }
// }


export const removeInvitedUsers = (idString) => async (dispatch) => {
    const id = parseInt(idString, 10)
    const res = await fetch(`/api/trips/${id}`, {
        method: 'DELETE',
    })

    if(res.ok) {
        dispatch(deleteInvitedUsers(id))
    }
}


const initialState = {};
const invitedUsersReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case POST_INVITED_USERS:
            newState[action.payload.id] = action.payload
            return newState
        // case LOAD_INVITED_USERS:
        //     newState = action.payload
        //     return newState
            // assumes incoming trips are flattened
        case DELETE_INVITED_USERS:
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}


export default invitedUsersReducer;