/** Tickets Reducers */
import types from './types'

const initialState = {
    deleting: false,
    adding: false,
    updating: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.DELETING_TICKET:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.TICKET_DELETED:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.ADDING_TICKET:
            return {
                ...state,
                adding: action.adding,
            }
        case types.TICKET_ADDED:
            return {
                ...state,
                adding: action.adding,
            }
        case types.UPDATING_TICKET:
            return {
                ...state,
                updating: action.updating,
            }
        case types.TICKET_UPDATED:
            return {
                ...state,
                updating: action.updating,
            }
        default:
            return state
    }
}

export default reducer