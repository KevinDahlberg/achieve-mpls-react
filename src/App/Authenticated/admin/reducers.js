/** Admin Reducer */
import { combineReducers } from 'redux';
import types from './types';

import eventsReducer from './Views/Events/reducers';
import formsReducer from './Views/Forms/reducers';
import sessionsReducer from './Views/Sessions/reducers';
import ticketsReducer from './Views/Tickets/reducers';
import usersReducer from './Views/Tickets/reducers';

const initialState = {
    events: [],
    forms: [],
    sessions: [],
    tickets: [],
    users: [],
    years: [],
    fetching: false,
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCHING_EVENTS:
        return {
            ...state,
            fetching: action.fetching,
        }
        case types.FETCHING_FORMS:
        return {
            ...state,
            fetching: action.fetching,
        }
        case types.FETCHING_SESSIONS:
        return {
            ...state,
            fetching: action.fetching,
        }
        case types.FETCHING_TICKETS:
        return {
            ...state,
            fetching: action.fetching,
        }
        case types.FETCHING_USERS:
        return {
            ...state,
            fetching: action.fetching,
        }
        case types.EVENTS_RECEIVED:
        return {
            ...state,
            fetching: action.fetching,
            events: action.events,
        }
        case types.FORMS_RECEIVED:
        return {
            ...state,
            fetching: action.fetching,
            forms: action.forms,
        }
        case types.SESSIONS_RECEIVED:
        return {
            ...state,
            fetching: action.fetching,
            sessions: action.sessions,
        }
        case types.TICKETS_RECEIVED:
        return {
            ...state,
            fetching: action.fetching,
            tickets: action.tickets,
        }
        case types.USERS_RECEIVED:
        return {
            ...state,
            fetching: action.fetching,
            users: action.users,
        }
        default:
        return state;
    }
}

const reducers = combineReducers({
    reducer,
    eventsReducer,
    formsReducer,
    sessionsReducer,
    ticketsReducer,
    usersReducer,
})


export default reducers;