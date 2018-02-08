import fetch from 'isomorphic-fetch';

const FETCHING_EXIT_TICKETS = 'FETCHING_EXIT_TICKETS';
const EXIT_TICKETS_RECEIVED = 'TICKETS_RECEIVED';

const initialState = {
    fetchingExitTickets: false,
    exitTickets: [],
}

const fetchingExitTickets = (bool) => {
    return {type: FETCHING_EXIT_TICKETS, fetchingExitTickets: bool}
}

const exitTicketsReceived = (exitTickets) => {
    return {
        type: EXIT_TICKETS_RECEIVED,
        fetchingExitTickets: false,
        exitTickets: exitTickets,
    }
}

export const getExitTickets = (session, id) => (dispatch) => {
    dispatch(fetchingExitTickets(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/coach/' + session + '/' + id;
    return new Promise ((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(exitTicketsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(fetchingExitTickets(false));
            reject(error);
        });
    });
}

function coachReducer(state = initialState, action) {
    switch(action.type) {
        case FETCHING_EXIT_TICKETS:
        return {
            ...state,
            fetchingExitTickets: action.fetchingExitTickets
        }
        case EXIT_TICKETS_RECEIVED:
        return {
            ...state,
            fetchingExitTickets: action.fetchingExitTickets,
            exitTickets: action.exitTickets,
        }
        default:
        return state;
    }
}

export default coachReducer;