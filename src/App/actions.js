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
        userName: userObj.user,
        userRole: userObj.role,
        userSession: userObj.session,
        userId: userObj.userId,
    }
}

function userLoggedOut() {
    return {
        type: types.LOGGED_OUT, 
        isAuthenticated: false,
        userName: '',
        userRole: '',
        userSession: '',
        userId: '',
    }
}

export default {
    authenticating,
    authenticateUser,
    userLoggedOut,
}