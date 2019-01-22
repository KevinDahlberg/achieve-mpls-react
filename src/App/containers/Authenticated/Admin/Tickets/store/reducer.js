import clone from 'clone';

import * as types from './types';

const blankTicket = {
    date: '',
    day: '',
    event: '',
    facilitator: '',
    form: '',
    response: [
        {
            answer: '',
            question: '',
        }
    ],
    school: '',
    session: '',
    user: {
        email: '',
        fname: '',
        lname: '',
    },
    year: '',
}

const initialState = {
    originalTickets: [],
    paginatedTickets: [],
    searchedTickets: [],
    searchString: '',
    currentTicket: clone(blankTicket),
    isGettingTickets: false,
    gettingTicketsError: {},
    isUpdatingTicket: false,
    updatingTicketError: {},
    isDeletingTicket: false,
    deletingTicketError: {},
}

function ticketsReducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_TICKETS_START:
            return { ...state, isGettingTickets: true, gettingTicketsError: {} };
        case types.GET_TICKETS_SUCCESS:
            return { ...state, isGettingTickets: false, originalTickets: action.data, tickets: action.data };
        case types.GET_TICKETS_FAILURE:
            return { ...state, isGettingTickets: false, gettingTicketsError: action.error };
        case types.UPDATE_TICKET_START:
            return { ...state, isUpdatingTicket: true, updatingTicketError: {} };
        case types.UPDATE_TICKET_SUCCESS:
            return { ...state, isUpdatingTicket: false };
        case types.UPDATE_TICKET_FAILURE:
            return { ...state, isUpdatingTicket: false, updatingTicketError: action.error };
        case types.DELETE_TICKET_START:
            return { ...state, isDeletingTicket: true, deletingTicketError: {} };
        case types.DELETE_TICKET_SUCCESS:
            return { ...state, isDeletingTicket: false };
        case types.DELETE_TICKET_FAILURE:
            return { ...state, isDeletingTicket: false, deletingTicketError: action.error };
        case types.SET_CURRENT_TICKET:
            return { ...state, currentTicket: action.data };
        case types.SET_SORTED_TICKETS:
            return { ...state, originalTickets: action.data };
        case types.SET_PAGINATION_TICKETS:
            return { ...state, paginatedTickets: action.data };
        case types.SET_SEARCH_TICKETS:
            return { ...state, searchedTickets: action.data.tickets, searchString: action.data.searchString };
        default:
            return state;
    }
}

export default ticketsReducer;