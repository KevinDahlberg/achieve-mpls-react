import clone from 'clone';

import * as types from './types';

const blankUser = {

}

const initialState = {
    originalUsers: [],
    paginatedUsers: [],
    searchedUsers: [],
    searchString: '',
    currentUser: clone(blankUser),
    isGettingUsers: false,
    gettingUsersError: {},
    isUpdatingUser: false,
    updatingUserError: {},
    isDeletingUser: false,
    deletingUserError: {},
}

function usersReducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_USERS_START:
            return { ...state, isGettingUsers: true, gettingUsersError: {} };
        case types.GET_USERS_SUCCESS:
            return { ...state, isGettingUsers: false, users: action.data };
        case types.GET_USERS_FAILURE:
            return { ...state, isGettingUsers: false, gettingUsersError: action.error };
        case types.UPDATE_USER_START:
            return { ...state, isUpdatingUser: true, updatingUserError: {} };
        case types.UPDATE_USER_SUCCESS:
            return { ...state, isUpdatingUser: false };
        case types.UPDATE_USER_FAILURE:
            return { ...state, isUpdatingUser: false, updatingUserError: action.error };
        case types.DELETE_USER_START:
            return { ...state, isDeletingUser: true, deletingUserError: {} };
        case types.DELETE_USER_SUCCESS:
            return { ...state, isDeletingUser: false, };
        case types.DELETE_USER_FAILURE:
            return { ...state, isDeletingUser: false, deletingUserError: action.error };
        case types.SET_CURRENT_USER:
            return { ...state, currentUser: action.data };
        case types.SET_SORTED_USERS:
            return { ...state, originalUsers: action.data };
        case types.SET_PAGINATION_USERS:
            return { ...state, paginatedUsers: action.data };
        case types.SET_SEARCH_USERS:
            return { ...state, searchedUsers: action.data.users, searchString: action.data.searchString };
        default:
            return state;
    }
}

export default usersReducer;