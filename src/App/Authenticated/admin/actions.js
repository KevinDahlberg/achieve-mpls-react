/** Admin Actions */
import types from './types';

const fetchingEvents = (bool) => { 
    return {
        type: types.FETCHING_EVENTS,
        fetching: bool,
    }
}

const fetchingForms = (bool) => {
    return {
        type: types.FETCHING_FORMS,
        fetching: bool,
    }
}

const fetchingYears = (bool) => {
    return {
        type: types.FETCHING_YEARS,
        fetching: bool,
    }
}

const fetchingSessions = (bool) => {
    return {
        type: types.FETCHING_SESSIONS,
        fetching: bool,
    }
}

const fetchingTickets = (bool) => {
    return {
        type: types.FETCHING_TICKETS,
        fetching: bool,
    }
}

const fetchingUsers = (bool) => {
    return {
        type: types.FETCHING_USERS,
        fetching: bool,
    }
}

const eventsReceived = (events) => {
    return {
        type: types.EVENTS_RECEIVED,
        fetching: false,
        events: events,
    }
}

const formsReceived = (forms) => {
    return {
        type: types.FORMS_RECEIVED,
        fetching: false,
        forms: forms,
    }
}

const sessionsReceived = (sessions) => {
    return {
        type: types.SESSIONS_RECEIVED,
        fetching: false,
        sessions: sessions,
    }
}

const ticketsReceived = (tickets) => {
    return {
        type: types.TICKETS_RECEIVED,
        fetching: false,
        tickets: tickets,
    }
}
const usersReceived = (users) => {
    return {
        type: types.USERS_RECEIVED,
        fetching: false,
        users: users, 
    }
}

const yearsReceived = (years) => {
    return {
        type: types.YEARS_RECEIVED,
        fetching: false,
        years: years,
    }
}

export default {
    fetchingEvents,
    fetchingForms,
    fetchingSessions,
    fetchingTickets,
    fetchingYears,
    fetchingUsers,
    eventsReceived,
    formsReceived,
    sessionsReceived,
    ticketsReceived,
    usersReceived,
    yearsReceived,
}