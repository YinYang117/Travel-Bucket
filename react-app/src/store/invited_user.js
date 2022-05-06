//import { csrfFetch } from './csrf';

const LOAD_INVITED_USERS = "invited_user/loadInvitedUsers"
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

const getInvitedUsers = (trips) => {
    return {
        type: LOAD_INVITED_USERS,
        payload: trips
    };
};

const deleteInvitedUsers = (id) => {
    return {
        type: DELETE_INVITED_USERS,
        payload: id
    };
}

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const postInvitedUsers = (tripAndUserName) => async (disptach) => {
    const {tripId, userName} = tripAndUserName
    console.log("THIS IS WHETHER OR NOT THIS IS A KEY VALUE PAIR OR NOT-----------------", tripId)
    const response = await fetch('/api/invited_users/', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({tripId, userName})
    });

    if (response.ok) {
        const data = await response.json();
        // data = {invitedUser: {email: 'marnie@aa.io', id: 2, username: 'marnie'}, tripId: '1'}
        let invitedUserId = data.invitedUser.id

        console.log("THIS IS DATA FOR USERNAME IN THE STORE-------------------", data)
        console.log("ThIS IS INVITED USER ID FOR THE STORE------", invitedUserId)
        
        // let integerInvitedUserId = parseInt(invitedUserId, 10)
        // // data gives us username
        // // query here for trip id and user id 
        const response2 = await fetch(`/api/trips/${tripId}/users`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({invitedUserId, tripId})
        })
        
        // if (response2.ok) {
            disptach(addInvitedUser(data))
        // } else if (response2.status < 500) {
        //     const data = await response.json();
        //     if (data.errors) return data.errors;
        // }

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) return data.errors;
    } else return ['An error occurred. Please try again.']
}

export const loadInvitedUsers = (tripId) => async (dispatch) => {
    const res = await fetch(`/api/trips/${tripId}/users`)
    // const res = await fetch(`/api/trips/users/${userId}/`) // thinking we dont need the trailing slashes
    if (res.ok) {
        const data = await res.json();
        console.log("THIS IS INVITED USERS FOR THE FRONTEND FOR GET---------------", data)
        dispatch(getInvitedUsers(data))
    }
}


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
        case LOAD_INVITED_USERS:
            newState = action.payload
            return newState
            // assumes incoming trips are flattened
        case DELETE_INVITED_USERS:
            delete newState[action.payload]
            return newState
        default:
            return state;
    }
}


export default invitedUsersReducer;