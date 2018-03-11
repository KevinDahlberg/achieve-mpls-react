import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { calculateCurrentYear } from '../utils';

const GETTING_TICKETS = 'GETTING_TICKETS';
const TICKETS_RECEIVED = 'TICKETS_RECEIVED';
const YEARS_RECEIVED = 'YEARS_RECEIVED';

const initialState = {
    tickets: [],
    currentYear: calculateCurrentYear(moment().format('YYYY')),
    fetchingTickets: false,
    ticketsReceived: false,
    years: [],
}

const gettingTickets = (bool) => {
    return {type: GETTING_TICKETS, fetchingTickets: bool};
}

const ticketsReceived = (ticketArray) => {
    return {
        type: TICKETS_RECEIVED,
        fetchingTickets: false,
        ticketsReceived: true,
        tickets: ticketArray,
    }
}

const yearsReceived = (years) => {
    return {
        type: YEARS_RECEIVED,
        years: years,
    }
}



function ticketReducer(state = initialState, action) {
    switch (action.type) {
        case GETTING_TICKETS:
        return {
            ...state,
            fetchingTickets: action.fetchingTickets,
        };
        case TICKETS_RECEIVED:
        return {
            ...state,
            fetchingTickets: action.fetchingTickets,
            ticketsReceived: action.ticketsReceived,
            tickets: action.tickets,
        }
        case YEARS_RECEIVED:
        return {
            ...state,
            years: action.years,
        }
        default:
            return state;
    }
}

export default ticketReducer;