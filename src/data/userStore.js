import fetch from 'isomorphic-fetch';

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

const initialState = {
    userName: '',
    userRole: '',
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
    }
}

function userAuthenticating(bool) {
    return {type: AUTHENTICATE_USER, authenticating: bool}
}

/** ACTION FUNCTIONS */
const setUser = (user, role) => (dispatch) => {
    const userObj = {
        user: user,
        role: role
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
    return new Promise(function(resolve, reject) {
        fetch('http://localhost:5000', init)
        .then(response => response.json())
        .then((data) => {
            dispatch(setUser(data.username, data.role))
            .then((data) => resolve(data))
        })
        .catch((error) => {
            dispatch(authenticating(false));
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
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/users/clearance', init)
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

function userReducer(state = initialState, action) {
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
        default:
            return state;
    }
}

export default userReducer;