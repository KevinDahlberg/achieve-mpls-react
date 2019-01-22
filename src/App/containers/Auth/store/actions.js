import types from './types';

export const loginUserStart = () => ({
    type: types.LOGIN_USER_START,
});

export const loginUserSuccess = (data) => ({
    type: types.LOGIN_USER_SUCCESS,
    data,
});

export const loginUserFailure = (error) => ({
    type: types.LOGIN_USER_FAILURE,
    error,
});

export const authenticateUserStart = () => ({
    type: types.AUTHENTICATE_USER_START,
});

export const authenticateUserSuccess = (data) => ({
    type: types.AUTHENTICATE_USER_SUCCESS,
    data,
});

export const authenticateUserFailure = (error) => ({
    type: types.AUTHENTICATE_USER_FAILURE,
    error,
});

export const logoutUserStart = () => ({
    type: types.LOGOUT_USER_START,
});

export const logoutUserSuccess = () => ({
    type: types.LOGOUT_USER_SUCCESS,
});

export const logoutUserFailure = (error) => ({
    type: types.LOGOUT_USER_FAILURE,
    error
});

export const forgotPWStart = () => ({
    type: types.FORGOT_PW_START,
});

export const forgotPWSuccess = () => ({
    type: types.FORGOT_PW_SUCCESS,
});

export const forgotPWFailure = (error) => ({
    type: types.FORGOT_PW_FAILURE,
    error,
});