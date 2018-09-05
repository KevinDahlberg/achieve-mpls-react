/** Authentication Actions */

import types from './types';

const authenticating = (bool) => {
    return {
        type: types.AUTHENTICATE_USER,
        authenticating: bool,
    }
}

function authenticateUser(userObj) {
    return {
        type: types.USER_AUTHENTICATED, 
        authenticating: false,
        isAuthenticated: true,
        firstName: userObj.fname,
        lastName: userObj.lname,
        email: userObj.email,
        userRole: userObj.role,
        years: userObj.years,
    }
}

function userLoggedOut() {
    return {
        type: types.LOGGED_OUT, 
        isAuthenticated: false,
        firstName: '',
        lastName: '',
        email: '',
        userRole: '',
        years: [],
    }
}

export default {
    authenticating,
    authenticateUser,
    userLoggedOut,
}