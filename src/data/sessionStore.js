import fetch from 'isomorphic-fetch';

const FETCHING_SESSIONS = 'FETCHING_SESSIONS';
const SESSIONS_RECEIVED = 'SESSIONS_RECEIVED';

const initialState = {
    fetchingSessions: false,
    sessions: [],
}

const fetchingSessions = (bool) => {
    return {type: FETCHING_SESSIONS, fetchingSessions: bool}
}

const sessionsReceived = (sessionArray) => {
    return {
        type: SESSIONS_RECEIVED,
        fethingSessions: false,
        sessions: sessionArray,
    }
}

export const getSessions = (year) => (dispatch) => {
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
        default:
        return state;
    }
}

export default sessionReducer;