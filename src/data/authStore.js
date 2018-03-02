import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { envUrl } from '../constants';
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
const LOGGED_OUT = 'LOGGED_OUT';

const initialState = {
    userName: '',
    userRole: '',
    userSession: '',
    isAuthenticated: false,
    authenticating: true,
}

/** ACTIONS */
function authenticateUser(userObj) {
    return {
        type: USER_AUTHENTICATED, 
        authenticating: false,
        isAuthenticated: true,
        userName: userObj.user,
        userRole: userObj.role,
        userSession: userObj.session,
    }
}

function userAuthenticating(bool) {
    return {type: AUTHENTICATE_USER, authenticating: bool}
}

function userLoggedOut() {
    return {
        type: LOGGED_OUT, 
        isAuthenticated: false,
        userName: '',
        userRole: '',
        userSession: '',
    }
}

/** ACTION FUNCTIONS */
const setUser = (user, role, session) => (dispatch) => {
    const userObj = {
        user: user,
        role: role,
        userSession: session,
    }
    return new Promise((res, rej) => {
        dispatch(authenticateUser(userObj))
        res(userObj);
    });
}

function authenticating(bool) {
    return dispatch => userAuthenticating(bool);
}

export const login = (creds) => (dispatch) => {
    dispatch(authenticating(true));
    const objToSend = {
        email: creds.email,
        password: creds.password,
    }
    //fetch object
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objToSend),
    }
    const url = envUrl
    return new Promise(function(resolve, reject) {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(setUser(data.username, data.role, data.session_count))
            .then((data) => resolve(data))
        })
        .catch((error) => {
            dispatch(authenticating(false));
            reject(error);
        })
    })
}

export const forgotPW = (email) => (dispatch) => {
    // set expiration date of chance
    const chanceExpiration = new Date();
    chanceExpiration.setDate(chanceExpiration.getDate() + 30);
    const chance_expiration = moment(chanceExpiration).format('YYYY-MM-DD');
    const objToSend = {
        email: email,
        chance_expiration: chance_expiration,
    }

    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objToSend),
    }
    const url = envUrl + '/mail/forgotpw';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const checkSession = () => (dispatch) => {
    dispatch(authenticating(true));
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/users/clearance'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(setUser(data.username, data.role))
            .then((data) => {
                dispatch(authenticating(false));
                resolve(data)
            })
        })
        .catch((error) => {
            dispatch(authenticating(false));
            reject(error);
        })
    })
}

export const logout = () => (dispatch) => {
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/logout'
    return new Promise ((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            dispatch(userLoggedOut());
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_AUTHENTICATED:
        return {
            ...state,
            authenticating: action.authenticating,
            isAuthenticated: action.isAuthenticated,
            userName: action.userName,
            userRole: action.userRole,
        };
        case AUTHENTICATE_USER:
        return {
            ...state,
            authenticating: action.authenticating,
        }
        case LOGGED_OUT:
        return {
            ...state,
            isAuthenticated: action.isAuthenticated,
            userName: action.userName,
            userRole: action.userRole,
        }
        default:
            return state;
    }
}

export default authReducer;