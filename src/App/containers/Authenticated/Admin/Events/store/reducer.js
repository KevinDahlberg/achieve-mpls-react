import clone from 'clone';

import types from './types';

const EMPTY_SESSION = {
    dayOfWeek: '',
    events: [],
    facilitator: '',
    grade: '',
    id: '',
    school: '',
    session: '',
    year: '',
}

const EMPTY_EVENT = {
    form: 'General Exit Ticket',
    open: new Date(),
    close: new Date(),
    event: '',
}

const initialState = {
    isFetchingEvents: false,
    fetchingEventsError: {},
    deleteEventError: {},
    currentSession: clone(EMPTY_SESSION),
    isAddingEvents: false,
    isDeletingEvents: false,
    isUpdatingEvent: false,
    updateEventError: {},
    addEventError: {},
    currentEvent: clone(EMPTY_EVENT),
}

function eventsReducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_EVENT_START:
            return { ...state, isFetchingEvents: true, fetchingEventsError: {} };
        case types.GET_EVENT_SUCCESS:
            return { ...state, isFetchingEvents: false, currentSession: action.data };
        case types.GET_EVENT_FAILURE:
            return { ...state, isFetchingEvents: false, fetchingEventsError: action.error };
        case types.CREATE_EVENT_START:
            return { ...state, isAddingEvents: true, addEventError: {} };
        case types.CREATE_EVENT_SUCCESS:
            return { ...state, isAddingEvents: false, };
        case types.CREATE_EVENT_FAILURE:
            return { ...state, isAddingEvents: false, addEventError: action.error };
        case types.DELETE_EVENT_START:
            return { ...state, isDeletingEvents: true, deleteEventError: {} };
        case types.DELETE_EVENT_SUCCESS:
            return { ...state, isDeletingEvents: false, };
        case types.DELETE_EVENT_FAILURE:
            return { ...state, isDeletingEvents: false, deleteEventError: action.error };
        case types.UPDATE_EVENT_START:
            return { ...state, isUpdatingEvent: true, updateEventError: {} };
        case types.UPDATE_EVENT_SUCCESS:
            return { ...state, isUpdatingEvent: false };
        case types.UPDATE_EVENT_FAILURE:
            return { ...state, isUpdatingEvent: false, updateEventError: {} };
        default:
            return state;
    }
}

export default eventsReducer;