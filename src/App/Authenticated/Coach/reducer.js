/** Coach Reducer */
import types from './types';

const initialState = {
    fetchingExitTickets: false,
    exitTickets: [],
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCHING_EXIT_TICKETS:
        return {
            ...state,
            fetchingExitTickets: action.fetchingExitTickets
        }
        case types.EXIT_TICKETS_RECEIVED:
        return {
            ...state,
            fetchingExitTickets: action.fetchingExitTickets,
            exitTickets: action.exitTickets,
        }
        default:
        return state;
    }
}

export default reducer;