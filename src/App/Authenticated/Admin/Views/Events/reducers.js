/** EVENT Reducers */
import types from './types'

const initialState = {
    deleting: false,
    adding: false,
    updating: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.DELETING_EVENT:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.EVENT_DELETED:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.ADDING_EVENT:
            return {
                ...state,
                adding: action.adding,
            }
        case types.EVENT_ADDED:
            return {
                ...state,
                adding: action.adding,
            }
        case types.UPDATING_EVENT:
            return {
                ...state,
                updating: action.updating,
            }
        case types.EVENT_UPDATED:
            return {
                ...state,
                updating: action.updating,
            }
        default:
            return state
    }
}

export default reducer