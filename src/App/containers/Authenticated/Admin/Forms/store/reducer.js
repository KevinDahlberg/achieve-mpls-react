import clone from 'clone';

import types from './types';

const blankForm = {
    form_name: '',
    questions: [
        {question: 'On a scale of 1-10 (with 10 highest) how would you rate your session today?'}
    ],
}

const initialState = {
    forms: [],
    currentForm: clone(blankForm),
    isFetchingForms: false,
    fetchingFormsError: {},
    isDeletingForm: false,
    deletingEventError: {},
    isCreatingForm: false,
    creatingFormError: {},
    isUpdatingForm: false,
    updatingFormError: {},
    isAssigningForm: false,
    assignFormError: {}
}

function formsReducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_FORMS_START:
            return { ...state, isFetchingForms: true, fetchingFormsError: {} };
        case types.GET_FORMS_SUCCESS:
            return { ...state, isFetchingForms: false, forms: action.data };
        case types.GET_FORMS_FAILURE:
            return { ...state, isFetchingForms: false, fetchingFormsError: action.error }
        case types.CREATE_FORM_START:
            return { ...state, isCreatingForm: true, creatingFormError: {} };
        case types.CREATE_FORM_SUCCESS:
            return { ...state, isCreatingForm: false };
        case types.CREATE_FORM_FAILURE:
            return { ...state, isCreatingForm: false, creatingFormError: action.error };
        case types.DELETE_FORM_START:
            return { ...state, isDeletingForm: true, deletingFormError: {} };
        case types.DELETE_FORM_SUCCESS:
            return { ...state, isDeletingForm: false };
        case types.DELETE_FORM_FAILURE:
            return { ...state, isDeletingForm: false, deletingFormError: action.error };
        case types.UPDATE_FORM_START:
            return { ...state, isUpdatingForm: true, updatingFormError: {} };
        case types.UPDATE_FORM_SUCCESS:
            return { ...state, isUpdatingForm: false };
        case types.UPDATE_FORM_FAILURE:
            return { ...state, isUpdatingForm: false, updatingFormError: action.error };
        case types.ASSIGN_FORM_START:
            return { ...state, isAssigningForm: true, assignFormError: {} };
        case types.ASSIGN_FORM_SUCCESS:
            return { ...state, isAssigningForm: false, };
        case types.ASSIGN_FORM_FAILURE:
            return { ...state, isAssigningForm: false, assignFormError: {} };
        case types.SET_CURRENT_FORM:
            return { ...state, currentForm: action.data };
        default:
            return state;

    }
}

export default formsReducer;