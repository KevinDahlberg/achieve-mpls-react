import fetch from 'isomorphic-fetch';

const FETCHING_USERS = 'FETCHING_USERS'
const USERS_RECEIVED = 'USERS_RECEIVED'

const initialState = {
    fetchingUsers: false,
    users: [],
}

const fetchingUsers = (bool) => {
    return {type: FETCHING_USERS, fetchingUsers: bool};
}

const usersReceived = (userArray) => {
    return {
        type: USERS_RECEIVED,
        fetchingUsers: false,
        users: userArray,
    }
}

export const getUsers = (year) => (dispatch) => {
    //todo set up backend to filter out users based on year
    dispatch(fetchingUsers(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/users'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(usersReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(fetchingUsers(false));
            reject(error);
        })
    })
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USERS:
        return {
            ...state,
            fetchingUsers: action.fetchingUsers,
        };
        case USERS_RECEIVED:
        return {
            ...state,
            fetchingUsers: action.fetchingUsers,
            users: action.users,
        }
        default:
            return state;
    }
}

export default usersReducer;