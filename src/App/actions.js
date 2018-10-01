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
        fname: userObj.fname,
        lname: userObj.lname,
        email: userObj.email,
        userRole: userObj.role,
        years: userObj.years,
    }
}

function userLoggedOut() {
    return {
        type: types.LOGGED_OUT, 
        isAuthenticated: false,
        fname: '',
        lname: '',
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