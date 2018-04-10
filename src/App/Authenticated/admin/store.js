import actions from './actions';
import { envUrl } from '../../constants';

export const fetchFormsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchForms(getState())) {
        dispatch(actions.fetchingForms(true));
        return dispatch(fetchForms());
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchForms = (state) => {
    const { forms } = state.adminReducer;
    if (forms.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const fetchForms = () => (dispatch) => {
    dispatch(actions.fetchingForms(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/forms'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(actions.formsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(actions.fetchingForms(false));
            reject(error);
        })
    })
}

export const fetchSessionsIfNeeded = (year) => (dispatch, getState) => {
    if(shouldFetchSessions(getState())) {
        dispatch(actions.fetchingSessions(true));
        return dispatch(fetchSessions(year));
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchSessions = (state) => {
    const { sessions } = state.adminReducer;
    if (sessions.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const fetchSessions = (year) => (dispatch) => {
    dispatch(actions.fetchingSessions(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/sessions/' + year;
    return new Promise ((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(actions.sessionsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(actions.fetchingSessions(false));
            reject(error);
        });
    });
}

// todo attach actions to this
export const getEvents = (session) => (dispatch) => {
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
            reject(error);
        })
    })
}

export const fetchYearsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchYears(getState())) {
        return dispatch(fetchYears())
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchYears = (state) => {
    const { years } = state.adminReducer;
    if (years.length === 0) {
        return true;
    } else {
        return false;
    }
}

const fetchYears = () => (dispatch) => {
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/sessions/years';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            const mapped = data.map((year) => {
                return year.year + ' - ' + (year.year + 1)
            });
            dispatch(actions.yearsReceived(mapped))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            reject(error);
        })
    })
}

export const fetchTicketsIfNeeded = (year) => (dispatch, getState) => {
    if (shouldFetchTickets(getState())) {
        dispatch(actions.fetchingTickets(true));
        return dispatch(fetchTickets(year))
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchTickets = (state) => {
    const { tickets } = state.adminReducer;
    if (tickets.length === 0) {
        return true;
    } else {
        return false;
    }
}

const fetchTickets = (year) => (dispatch) => {
    dispatch(actions.fetchingTickets(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/tickets/' + year;
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(actions.ticketsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(actions.fetchingTickets(false));
            console.error(error);
            reject(error);
        })
    })
}

export const fetchUsersIfNeeded = (year) => (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
        dispatch(actions.fetchingUsers(true));
        return dispatch(fetchUsers(year))
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchUsers = (state) => {
    const { users } = state.adminReducer;
    if (users.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const fetchUsers = (year) => (dispatch) => {
    //todo set up backend to filter out users based on year
    dispatch(actions.fetchingUsers(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/users';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(actions.usersReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(actions.fetchingUsers(false));
            reject(error);
        })
    })
}