import * as types from './types';

export const getTicketsStart = () => ({
    type: types.GET_TICKETS_START,
});

export const getTicketsSuccess = (data) => ({
    type: types.GET_TICKETS_SUCCESS,
    data,
});

export const getTicketsFailure = (error) => ({
    type: types.GET_TICKETS_FAILURE,
    error,
});

export const updateTicketStart = () => ({
    type: types.UPDATE_TICKET_START,
});

export const updateTicketSuccess = () => ({
    type: types.UPDATE_TICKET_SUCCESS,
});

export const updateTicketFailure = (error) => ({
    type: types.UPDATE_TICKET_FAILURE,
    error,
});

export const deleteTicketStart = () => ({
    type: types.DELETE_TICKET_START,
});

export const deleteTicketSuccess = () => ({
    type: types.DELETE_TICKET_SUCCESS,
});

export const deleteTicketFailure = (error) => ({
    type: types.DELETE_TICKET_FAILURE,
    error,
});

export const setCurrentTicket = (data) => ({
    type: types.SET_CURRENT_TICKET,
    data,
});

export const setSortedTickets = (data) => ({
    type: types.SET_SORTED_TICKETS,
    data,
});

export const setPaginationTickets = (data) => ({
    type: types.SET_PAGINATION_TICKETS,
    data,
});

export const setSearchTickets = (data) => ({
    type: types.SET_SEARCH_TICKETS,
    data,
})
