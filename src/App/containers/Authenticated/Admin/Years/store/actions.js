import * as types from './types';

export const setCurrentYear = (data) => ({
    type: types.SET_CURRENT_YEAR,
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
