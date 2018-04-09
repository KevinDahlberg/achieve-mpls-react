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

export default {
    fetchingExitTickets,
    exitTicketsReceived,
}