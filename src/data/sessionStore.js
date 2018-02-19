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
        return dispatch(fetchSessions(year));
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

export const fetchSessions = (year) => (dispatch) => {
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

export const addSession = (session) => (dispatch) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(session),
    }
    const url = envUrl + '/sessions/add'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            dispatch(fetchingEvents(false));
            reject(error);
        })
    })
}

export const updateSession = (session) => (dispatch) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(session),
    }
    const url = envUrl + '/sessions/update';
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

export const deleteSession = (session) => (dispatch) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/sessions/delete/' + session.id;
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

export const addEvent = (event) => (dispatch) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(event),
    }
    const url = envUrl + '/events/add'
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

export const updateEvent = (event) => (dispatch) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(event),
    }
    const url = envUrl + '/events/update'
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

export const deleteEvent = (event) => (dispatch) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/events/delete/' + event.id
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