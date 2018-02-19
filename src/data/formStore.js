import fetch from 'isomorphic-fetch';

import { envUrl } from '../constants';

const FETCHING_FORMS = 'FETCHING_FORMS';
const FORMS_RECEIVED = 'FORMS_RECEIVED';

const initialState = {
    fetchingForms: false,
    forms: [],
    formsReceived: false,
}

const fetchingForms = (bool) => {
    return {type: FETCHING_FORMS, fetchingForms: bool};
}

const formsReceived = (formArray) => {
    return {
        type: FORMS_RECEIVED,
        fetchingForms: false,
        forms: formArray,
        formsReceived: true,
    }
}

export const fetchFormsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchForms(getState())) {
        dispatch(fetchingForms(true));
        return dispatch(fetchForms());
    } else {
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }
}

const shouldFetchForms = (state) => {
    const { forms } = state.formReducer;
    if (forms.length === 0) {
        return true;
    } else {
        return false;
    }
}

export const fetchForms = () => (dispatch) => {
    dispatch(fetchingForms(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/forms'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(formsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(fetchingForms(false));
            reject(error);
        })
    })
}

export const addForm = (form) => (dispatch) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(form),
    }
    const url = envUrl + '/forms/add';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const updateForm = (form) => (dispatch) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(form),
    }
    const url = envUrl + '/forms/update';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const deleteForm = (form) => (dispatch) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/delete/' + form.id
    return new Promise((resolve, reject) => {
        fetch(init, url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const deleteQuestion = (question) => (dispatch) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/delete/' + question.id
    return new Promise((resolve, reject) => {
        fetch(init, url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const assignForms = (yearAndGradeObj) => (dispatch) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(yearAndGradeObj),
    }
    const url = envUrl + '/assign'
    return new Promise((resolve, reject) => {
        fetch(init, url)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}


function formReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_FORMS:
        return {
            ...state,
            fetchingForms: action.fetchingForms,
        }
        case FORMS_RECEIVED:
        return {
            ...state,
            fetchingForms: action.fetchingForms,
            forms: action.forms,
            formsReceived: action.formsReceived,
        }
        default:
            return state;
    }
}

export default formReducer;