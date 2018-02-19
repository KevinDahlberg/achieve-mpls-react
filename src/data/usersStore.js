import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { generateId } from '../utils';
import { envUrl } from '../constants';

const FETCHING_USERS = 'FETCHING_USERS';
const USERS_RECEIVED = 'USERS_RECEIVED';

const initialState = {
    fetchingUsers: false,
    users: [],
    usersReceived: false,
}

const fetchingUsers = (bool) => {
    return {type: FETCHING_USERS, fetchingUsers: bool};
}

const usersReceived = (userArray) => {
    return {
        type: USERS_RECEIVED,
        fetchingUsers: false,
        usersReceived: true,
        users: userArray,
    }
}

export const fetchUsersIfNeeded = (year) => (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
        dispatch(fetchingUsers(true));
        return dispatch(fetchUsers(year))
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}
const shouldFetchUsers = (state) => {
    const { users } = state.usersReducer;
    if (users.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const fetchUsers = (year) => (dispatch) => {
    //todo set up backend to filter out users based on year
    dispatch(fetchingUsers(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/users';
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

export const addNewUser = (user) => (dispatch) => {
    user.password = generateId(10);
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(user),
    }
    const url = envUrl + '/users/postUser';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateUser = (user) => (dispatch) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(user),
    }
    const url = envUrl + '/users/updateUser';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const resetPW = (user) => (dispatch) => {
    const chanceExpiration = new Date();
    chanceExpiration.setDate(chanceExpiration.getDate() + 30);
    user.chance_expiration = moment(chanceExpiration).format('YYYY-MM-DD');
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    // obj needs id, email, and chance 
    const url = 'http://localhost:5000/mail'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const deleteUser = (user) => (dispatch) => {
    const userId = user.id;
    const adminUrl = envUrl + '/users/delete/' + userId
    const coachUrl = envUrl + '/users/deactivateUser'
    return new Promise((resolve, reject) => {
        if (user.role === 'admin') {
            const init = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }
            fetch(adminUrl, init)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        } else {
            const init = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(user),
            }
            fetch(coachUrl, init)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        }
    })   
}

function usersReducer(state = initialState, action) {
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
            usersReceived: action.usersReceived,
        }
        default:
            return state;
    }
}

export default usersReducer;