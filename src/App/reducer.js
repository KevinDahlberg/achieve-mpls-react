/** Reducers for App and Auth */
import { combineReducers } from 'redux';

import types from './types'

const initialState = {
    isAuthenticated: false,
    userName: '',
    userRole: '',
    userSession: '',
    userId: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return {
                ...state,
                authenticating: action.authenticating,
            }
        case types.USER_AUTHENTICATED:
            return {
                ...state,
                authenticating: action.authenticating,
                isAuthenticated: action.isAuthenticated,
                userName: action.userName,
                userRole: action.userRole,
                userSession: action.userSession,
                userId: action.userId,
            }
        case types.LOGGED_OUT:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                userName: action.userName,
                userRole: action.userRole,
                userSession: action.userSession,
                userId: action.userId,
            }
        default:
            return { ...state }
    }
}

export default reducer
