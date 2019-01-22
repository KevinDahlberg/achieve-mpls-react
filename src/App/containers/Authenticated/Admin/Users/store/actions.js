import * as types from './types';

export const getUsersStart = () => ({
    type: types.GET_USERS_START,
});

export const getUsersSuccess = (data) => ({
    type: types.GET_USERS_SUCCESS,
    data,
});

export const getUsersFailure = (error) => ({
    type: types.GET_USERS_FAILURE,
    error,
});

export const updateUserStart = () => ({
    type: types.UPDATE_USER_START,
});

export const updateUserSuccess = () => ({
    type: types.UPDATE_USER_SUCCESS,
});

export const updateUserFailure = (error) => ({
    type: types.UPDATE_USER_FAILURE,
    error,
});

export const deleteUserStart = () => ({
    type: types.DELETE_USER_START,
});

export const deleteUserSuccess = () => ({
    type: types.DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error) => ({
    type: types.DELETE_USER_FAILURE,
    error,
});

export const setCurrentUser = (data) => ({
    type: types.SET_CURRENT_USER,
    data,
});

export const getYearsStart = () => ({
    type: types.GET_YEARS_START,
});

export const getYearsSuccess = (data) => ({
    type: types.GET_YEARS_SUCCESS,
    data,
});

export const getYearsFailure = (error) => ({
    type: types.GET_YEARS_FAILURE,
    error,
});
