import clone from 'clone';

/** Coach Reducer */
import types from './types';

const blankTicket = {
    close: '',
    event: '',
    form: {
        active: true,
        id: '',
        name: '',
        questions: [
            {question: '', answer:''}
        ],
    },
    formId: '',
    open: '',
}

const initialState = {
    isFetchingTickets: false,
    isSubmittingTickets: false,
    isFetchingCompleted: false,
    completed: [],
    tickets: [],
    openTickets: [],
    currentTicket: clone(blankTicket),
    session: {},
    fetchingTicketsError: {},
    submittingTicketsError: {},
    fetchingCompletedError: {},
}

function reducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_TICKETS_START:
            return { ...state, isFetchingTickets: true, fetchingTicketsError: {} };
        case types.GET_TICKETS_SUCCESS:
            return { ...state, isFetchingTickets: false, tickets: action.data.events, session: action.data.session };
        case types.GET_TICKETS_FAILURE:
            return { ...state, isFetchingTickets: false, fetchingTicketsError: {} };
        case types.SUBMIT_TICKET_START:
            return { ...state, isSubmittingTickets: true, submittingTicketsError: {} };
        case types.SUBMIT_TICKET_SUCCESS:
            return { ...state, isSubmittingTickets: false, currentTicket: clone(blankTicket) };
        case types.SUBMIT_TICKET_FAILURE:
            return { ...state, isSubmittingTickets: false, submittingTicketsError: action.error };
        case types.GET_COMPLETED_START:
            return { ...state, isFetchingCompleted: true, fetchingCompletedError: {} };
        case types.GET_COMPLETED_SUCCESS:
            return { ...state, isFetchingCompleted: false, completed: action.data, };
        case types.GET_COMPLETED_FAILURE:
            return { ...state, isFetchingCompleted: false, fetchingCompletedError: action.error };
        case types.SET_OPEN_TICKETS:
            return { ...state, openTickets: action.data };
        case types.SET_CURRENT_TICKET:
            return { ...state, currentTicket: action.data };
        default:
            return state;
    }
}

export default reducer;