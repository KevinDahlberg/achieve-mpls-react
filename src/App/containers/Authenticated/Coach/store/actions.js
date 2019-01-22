/** Coach Actions */
import types from './types'

const getTicketsStart = () => ({
    type: types.GET_TICKETS_START,
});

const getTicketsSuccess = (data) => ({
    type: types.GET_TICKETS_SUCCESS,
    data,
});

const getTicketsFailure = (error) => ({
    type: types.GET_TICKETS_FAILURE,
    error
});

const submitTicketStart = () => ({
    type: types.SUBMIT_TICKET_START,
});

const submitTicketSuccess = () => ({
    type: types.SUBMIT_TICKET_SUCCESS,
});

const submitTicketFailure = (error) => ({
    type: types.SUBMIT_TICKET_FAILURE,
    error,
});

const getCompletedStart = () => ({
    type: types.GET_COMPLETED_START,
});

const getCompletedSuccess = (data) => ({
    type: types.GET_COMPLETED_SUCCESS,
    data,
});

const getCompletedFailure = (error) => ({
    type: types.GET_COMPLETED_FAILURE,
    error,
});

const setOpenTickets = (data) => ({
    type: types.SET_OPEN_TICKETS,
    data,
});

const setCurrentTicket = (data) => ({
    type: types.SET_CURRENT_TICKET,
    data,
});

export default {
    getTicketsStart,
    getTicketsSuccess,
    getTicketsFailure,
    submitTicketStart,
    submitTicketSuccess,
    submitTicketFailure,
    getCompletedStart,
    getCompletedSuccess,
    getCompletedFailure,
    setOpenTickets,
    setCurrentTicket,
}