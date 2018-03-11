/** Reducers for App and Auth */
import { combineReducers } from 'redux';

import types from './types'
import coachReducer from './Authenticated/Coach/reducers';
import adminReducer from './Authenticated/Admin/reducers'

const initialState = {
    isAuthenticated: false,
    userName: '',
    userRole: '',
    userSession: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return {
                ...state,
                authenticating: action.authenticating,
            }
        case types.USER_AUTHENTICATED:
            return {
                ...state,
                autheinticating: action.authenticating,
                isAuthenticated: action.isAuthenticated,
                userName: action.userName,
                userRole: action.userRole,
                userSession: action.userSession,
            }
        case types.LOGGED_OUT:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                userName: action.userName,
                userRole: action.userRole,
                userSession: action.userSession,
            }
        default:
            return { ...state }
    }
}

const reducers = combineReducers({
    adminReducer,
    authReducer,
    coachReducer,
})

export default reducers
