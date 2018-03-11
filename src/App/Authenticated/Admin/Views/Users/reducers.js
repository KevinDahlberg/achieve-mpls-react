/** Users Reducers */
import types from './types'

const initialState = {
    deleting: false,
    adding: false,
    updating: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.DELETING_USER:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.USER_DELETED:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.ADDING_USER:
            return {
                ...state,
                adding: action.adding,
            }
        case types.USER_ADDED:
            return {
                ...state,
                adding: action.adding,
            }
        case types.UPDATING_USER:
            return {
                ...state,
                updating: action.updating,
            }
        case types.USER_UPDATED:
            return {
                ...state,
                updating: action.updating,
            }
        default:
            return state
    }
}

export default reducer