import actions from './actions';
import { envUrl } from '../../constants';
import firebase, { auth, db } from '../../../firebase';

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
    return new Promise((resolve, reject) => {
        db.collection("forms").get()
        .then((data) => {
            const forms = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.formsReceived(forms))
            resolve(forms)
        })
        .catch((error) => {
            dispatch(actions.fetchingForms(false));
            console.error(error);
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
    return new Promise ((resolve, reject) => {
        db.collection('years').doc(year.toString()).collection('sessions').get()
        .then((data) => {
            const sessions = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.sessionsReceived(sessions))
            resolve(sessions)
        })
        .catch((error) => {
            dispatch(actions.fetchingSessions(false));
            console.error(error);
            reject(error);
        })
    });
}

export const fetchYearsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchYears(getState())) {
        dispatch(actions.fetchingYears(true))
        return dispatch(fetchYears());
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        });
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

export const fetchYears = () => (dispatch) => {
    dispatch(actions.fetchingYears(true))
    return new Promise ((resolve, reject) => {
        db.collection('years').get()
        .then(data => {
            const years = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.yearsReceived(years))
            resolve(years)
        })
        .catch((error) => {
            dispatch(actions.fetchingYears(false));
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

export const fetchTickets = (year) => (dispatch) => {
    console.log(year);
    dispatch(actions.fetchingTickets(true))
    return new Promise((resolve, reject) => {
        db.collection("responses").where("year", "==", year).get()
        .then((data) => {
            const tickets = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.ticketsReceived(tickets))
            resolve(tickets)
        })
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
    return new Promise((resolve, reject) => {
        db.collection('years').doc(year.toString()).collection('users').get()
        .then((data) => {
            const users = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.usersReceived(users));
            resolve(users);
        })
        .catch((error) => {
            dispatch(actions.fetchingUsers(false));
            reject(error);
        })
    })
}