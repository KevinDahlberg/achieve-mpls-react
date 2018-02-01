import fetch from 'isomorphic-fetch'

const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

const initialState = {
    userName: '',
    userRole: '',
    isAuthenticated: false,
    authenticating: false,
}

/** ACTIONS */
function authenticateUser() {
    return {type: AUTHENTICATE_USER, authenticating: true}
}

function userAuthenticated() {
    return {type: USER_AUTHENTICATED, authenticating: false}
}

/** ACTION FUNCTIONS */
// export function logInUser(userName, password) {

// }

function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
        return {
            ...state,
            authenticating: action.authenticating,
        };
        case USER_AUTHENTICATED:
        return {
            ...state,
            authenticating: action.authenticating,
        }
        default:
            return state;
    }
}

export default userReducer;