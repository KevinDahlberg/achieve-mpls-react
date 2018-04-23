/** Coach Actions */
import types from './types'

const fetchingExitTickets = (bool) => {
    return {type: types.FETCHING_EXIT_TICKETS, fetchingExitTickets: bool}
}

const exitTicketsReceived = (exitTickets) => {
    return {
        type: types.EXIT_TICKETS_RECEIVED,
        fetchingExitTickets: false,
        exitTickets: exitTickets,
    }
}

const sendingExitTicket = () => {
    return {
        type: types.SENDING_EXIT_TICKET,
        fetchingExitTickets: false,
        exitTickets: [],
    }
}

export default {
    fetchingExitTickets,
    exitTicketsReceived,
    sendingExitTicket,
}