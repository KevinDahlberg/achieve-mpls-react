import clone from 'clone';

import types from './types';

const blankSession = {}

const initialState = {
    sessions: [],
    currentSession: clone(blankSession),
    isGettingSessions: false,
    gettingSessionsError: {},
    isUpdatingSession: false,
    updatingSessionError: {},
    isDeletingSession: false,
    deletingSessionError: {},
}

function sessionReducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_SESSIONS_START:
            return { ...state, isGettingSessions: true, gettingSessionsError: {} };
        case types.GET_SESSIONS_SUCCESS:
            return { ...state, isGettingSessions: false, sessions: action.data };
        case types.GET_SESSIONS_FAILURE:
            return { ...state, isGettingSessions: false, gettingSessionsError: action.error };
        case types.UPDATE_SESSION_START:
            return { ...state, isUpdatingSession: true, updatingSessionError: {} };
        case types.UPDATE_SESSION_SUCCESS:
            return { ...state, isUpdatingSession: false, };
        case types.UPDATE_SESSION_FAILURE:
            return { ...state, isUpdatingSession: false, updatingSessionError: action.error };
        case types.DELETE_SESSION_START:
            return { ...state, isDeletingSession: true, deletingSessionError: {} };
        case types.DELETE_SESSION_SUCCESS:
            return { ...state, isDeletingSession: false, };
        case types.DELETE_SESSION_FAILURE:
            return { ...state, isDeletingSession: false, deletingSessionError: action.error };
        case types.SET_CURRENT_SESSION:
            return { ...state, currentSession: action.data };
        default:
            return state;
    }
}

export default sessionReducer;