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
    console.log('years in call ', years)
    return {
        type: YEARS_RECEIVED,
        years: years,
    }
}

export const getTickets = (year) => (dispatch) => {
    console.log('getTickets called');
    dispatch(gettingTickets(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/tickets/' + year;
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(ticketsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(gettingTickets(false));
            reject(error);
        })
    })
}

export const getYears = () => (dispatch) => {
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/sessions/years';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            const mapped = data.map((year) => {
                return year.year + ' - ' + (year.year + 1)
            });

            dispatch(yearsReceived(mapped))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            reject(error);
        })
    })
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