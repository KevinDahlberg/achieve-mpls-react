import fetch from 'isomorphic-fetch';
import { envUrl } from '../constants';

const FETCHING_SESSIONS = 'FETCHING_SESSIONS';
const SESSIONS_RECEIVED = 'SESSIONS_RECEIVED';
const FETCHING_EVENTS = 'FETCHING_EVENTS';
const EVENTS_RECEIVED = 'EVENTS_RECEIVED';

const initialState = {
    fetchingSessions: false,
    sessions: [],
    fetchingEvents: true,
    sessionsReceived: false,
}

const fetchingSessions = (bool) => {
    return {type: FETCHING_SESSIONS, fetchingSessions: bool}
}

const sessionsReceived = (sessionArray) => {
    return {
        type: SESSIONS_RECEIVED,
        fethingSessions: false,
        sessions: sessionArray,
        sessionsReceived: true,
    }
}

const fetchingEvents = (bool) => {
    return {type: FETCHING_EVENTS, fetchingEvents: bool}
}

const eventsReceived = (sessionArray) => {
    return {type: EVENTS_RECEIVED, sessions: sessionArray, fetchingEvents: false}
}

export const fetchSessionsIfNeeded = (year) => (dispatch, getState) => {
    if(shouldFetchSessions(getState())) {
        dispatch(fetchingSessions(true));
        return dispatch(getSessions(year));
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchSessions = (state) => {
    const { sessions } = state.sessionReducer;
    if (sessions.length === 0) {
        return true;
    } else {
        return false;
    }
}

const getSessions = (year) => (dispatch) => {
    dispatch(fetchingSessions(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/sessions/' + year;
    return new Promise ((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(sessionsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(fetchingSessions(false));
            reject(error);
        });
    });
}

export const getEvents = (session) => (dispatch) => {
    dispatch(fetchingEvents(true));
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/events/' + session;
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            dispatch(fetchingEvents(false));
            reject(error);
        })
    })
}

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_SESSIONS:
        return {
            ...state,
            fetchingSessions: action.fetchingSessions,
        }
        case SESSIONS_RECEIVED:
        return {
            ...state,
            fetchingSessions: action.fetchingSessions,
            sessions: action.sessions,
        }
        case FETCHING_EVENTS:
        return {
            ...state,
            fetchingEvents: action.fetchingEvents,
        }
        case EVENTS_RECEIVED:
        return {
            ...state,
            fetchingEvents: action.fetchingEvents,
            sessions: action.sessions,
        }
        default:
        return state;
    }
}

export default sessionReducer;