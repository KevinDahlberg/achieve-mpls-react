/** Sessions Reducers */
import types from './types'

const initialState = {
    deleting: false,
    adding: false,
    updating: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.DELETING_SESSION:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.SESSION_DELETED:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.ADDING_SESSION:
            return {
                ...state,
                adding: action.adding,
            }
        case types.SESSION_ADDED:
            return {
                ...state,
                adding: action.adding,
            }
        case types.UPDATING_SESSION:
            return {
                ...state,
                updating: action.updating,
            }
        case types.SESSION_UPDATED:
            return {
                ...state,
                updating: action.updating,
            }
        default:
            return state
    }
}

export default reducer