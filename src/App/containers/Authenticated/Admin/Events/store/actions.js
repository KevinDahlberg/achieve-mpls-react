import types from './types';

const getEventStart = () => ({
    type: types.GET_EVENT_START,
});

const getEventSuccess = (data) => ({
    type: types.GET_EVENT_SUCCESS,
    data,
});

const getEventFailure = (error) => ({
    type: types.GET_EVENT_FAILURE,
    error,
});

const createEventStart = () => ({
    type: types.CREATE_EVENT_START,
});

const createEventSuccess = () => ({
    type: types.CREATE_EVENT_SUCCESS,
});

const createEventFailure = (error) => ({
    type: types.CREATE_EVENT_FAILURE,
    error,
});

const deleteEventStart = () => ({
    type: types.DELETE_EVENT_START,
});

const deleteEventSuccess = () => ({
    type: types.DELETE_EVENT_SUCCESS,
});

const deleteEventFailure = (error) => ({
    type: types.DELETE_EVENT_FAILURE,
    error,
});

const updateEventStart = () => ({
    type: types.UPDATE_EVENT_START,
});

const updateEventSuccess = () => ({
    type: types.UPDATE_EVENT_SUCCESS,
});

const updateEventFailure = (error) => ({
    type: types.UPDATE_EVENT_FAILURE,
    error,
})

export default {
    getEventStart,
    getEventSuccess,
    getEventFailure,
    createEventStart,
    createEventSuccess,
    createEventFailure,
    deleteEventStart,
    deleteEventSuccess,
    deleteEventFailure,
    updateEventStart,
    updateEventSuccess,
    updateEventFailure,
}

