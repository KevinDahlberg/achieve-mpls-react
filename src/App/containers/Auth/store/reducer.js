import clone from 'clone';

import types from './types';

const initialState = {
    isAuthenticated: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isAuthenticating: false,
    isForgotPW: false,
    forgotPWError: {},
    loginError: {},
    authenticatingError: {},
    logoutError: {},
    user: {},
}

const reducer = (state = clone(initialState), action) => {
    switch (action.type) {
        case types.LOGIN_USER_START:
            return { ...state, isLoggingIn: true};
        case types.LOGIN_USER_SUCCESS:
            return { ...state, isLoggingIn: false, isAuthenticated: true, user: action.data };
        case types.LOGIN_USER_FAILURE:
            return { ...state, isLoggingIn: false, loginError: action.error };
        case types.AUTHENTICATE_USER_START:
            return { ...state, isAuthenticating: true, isAuthenticated: false, authenticatingError: {} };
        case types.AUTHENTICATE_USER_SUCCESS:
            return { ...state, isAuthenticating: false, isAuthenticated: true, user: action.data };
        case types.AUTHENTICATE_USER_FAILURE:
            return { ...state, isAuthenticating: false, isAuthenticated: false, authenticatingError: action.error };
        case types.LOGOUT_USER_START:
            return { ...state, isLoggingOut: true, logoutError: {} };
        case types.LOGOUT_USER_SUCCESS:
            return { ...state, isLoggingOut: false, user: {}, isAuthenticated: false };
        case types.LOGOUT_USER_FAILURE:
            return { ...state, isLoggingOut: false, user: {}, isAuthenticated: false, authenticatingError: action.error };
        case types.FORGOT_PW_START:
            return { ...state, isForgotPW: true, forgotPWError: {} };
        case types.FORGOT_PW_SUCCESS:
            return { ...state, isForgotPW: false };
        case types.FORGOT_PW_FAILURE:
            return { ...state, isForgotPW: false, forgotPWError: action.error };
        default:
            return state;
    }
}

export default reducer;