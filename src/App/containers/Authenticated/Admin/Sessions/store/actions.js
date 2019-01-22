import types from './types';

const getSessionsStart = () => ({
  type: types.GET_SESSIONS_START,
});

const getSessionsSuccess = (data) => ({
    type: types.GET_SESSIONS_SUCCESS,
    data,
});

const getSessionsFailure = (error) => ({
    type: types.GET_SESSIONS_FAILURE,
    error,
});

const createSessionStart = () => ({
    type: types.CREATE_SESSION_START,
});

const createSessionSuccess = () => ({
    type: types.CREATE_SESSION_SUCCESS,
});

const createSessionFailure = (error) => ({
    type: types.CREATE_SESSION_FAILURE,
    error,
});

const deleteSessionStart = () => ({
    type: types.DELETE_SESSION_START,
});

const deleteSessionSuccess = () => ({
    type: types.DELETE_SESSION_SUCCESS,
});

const deleteSessionFailure = (error) => ({
    type: types.CREATE_SESSION_FAILURE,
    error,
});

const updateSessionStart = () => ({
    type: types.UPDATE_SESSION_START,
});

const updateSessionSuccess = () => ({
    type: types.UPDATE_SESSION_SUCCESS,
});

const updateSessionFailure = (error) => ({
    type: types.UPDATE_SESSION_FAILURE,
    error,
})

const setCurrentSession = (data) => ({
    type: types.SET_CURRENT_SESSION,
    data,
});

export default {
    getSessionsStart,
    getSessionsSuccess,
    getSessionsFailure,
    createSessionStart,
    createSessionSuccess,
    createSessionFailure,
    deleteSessionStart,
    deleteSessionSuccess,
    deleteSessionFailure,
    updateSessionStart,
    updateSessionSuccess,
    updateSessionFailure,
    setCurrentSession,
}

