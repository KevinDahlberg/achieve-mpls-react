import types from './types';

const getFormsStart = () => ({
    type: types.GET_FORMS_START,
});

const getFormsSuccess = (data) => ({
    type: types.GET_FORMS_SUCCESS,
    data,
});

const getFormsFailure = (error) => ({
    type: types.GET_FORMS_FAILURE,
    error,
});

const createFormStart = () => ({
    type: types.CREATE_FORM_START,
});

const createFormSuccess = () => ({
    type: types.CREATE_FORM_SUCCESS,
});

const createFormFailure = (error) => ({
    type: types.CREATE_FORM_FAILURE,
    error,
});

const deleteFormStart = () => ({
    type: types.DELETE_FORM_START,
});

const deleteFormSuccess = () => ({
    type: types.DELETE_FORM_SUCCESS,
});

const deleteFormFailure = (error) => ({
    type: types.DELETE_FORM_FAILURE,
    error,
});

const updateFormStart = () => ({
    type: types.UPDATE_FORM_START,
});

const updateFormSuccess = () => ({
    type: types.UPDATE_FORM_SUCCESS,
});

const updateFormFailure = (error) => ({
    type: types.UPDATE_FORM_FAILURE,
    error,
});

const assignFormStart = () => ({
    type: types.ASSIGN_FORM_START,
});

const assignFormSuccess = () => ({
    type: types.ASSIGN_FORM_SUCCESS,
});

const assignFormFailure = (error) => ({
    type: types.ASSIGN_FORM_FAILURE,
    error,
})

const setCurrentForm = (data) => ({
    type: types.SET_CURRENT_FORM,
    data,
})

export default {
    getFormsStart,
    getFormsSuccess,
    getFormsFailure,
    createFormStart,
    createFormSuccess,
    createFormFailure,
    deleteFormStart,
    deleteFormSuccess,
    deleteFormFailure,
    updateFormStart,
    updateFormSuccess,
    updateFormFailure,
    assignFormStart,
    assignFormSuccess,
    assignFormFailure,
    setCurrentForm,
}

