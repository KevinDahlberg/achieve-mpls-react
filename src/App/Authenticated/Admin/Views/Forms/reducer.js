/** FORMs Reducers */
import types from './types'

const initialState = {
    deleting: false,
    adding: false,
    updating: false,
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case types.DELETING_FORM:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.FORM_DELETED:
            return {
                ...state,
                deleting: action.deleting,
            }
        case types.ADDING_FORM:
            return {
                ...state,
                adding: action.adding,
            }
        case types.FORM_ADDED:
            return {
                ...state,
                adding: action.adding,
            }
        case types.UPDATING_FORM:
            return {
                ...state,
                updating: action.updating,
            }
        case types.FORM_UPDATED:
            return {
                ...state,
                updating: action.updating,
            }
        default:
            return state
    }
}

export default reducer