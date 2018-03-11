/** Form Queries */
import fetch from 'isomorphic-fetch';
import { envUrl } from '../../../../constants';

import actions from './actions';

export const addForm = (form) => (dispatch) => {
    dispatch(actions.addingForm());
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
            dispatch(actions.formAdded());
            resolve(response);
        })
        .catch((error) => {
            dispatch(actions.formAdded());
            reject(error);
        });
    });
}

export const updateForm = (form) => (dispatch) => {
    dispatch(actions.updatingForm());
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
            dispatch(actions.formUpdated());
            resolve(response);
        })
        .catch((error) => {
            dispatch(actions.formUpdated());
            reject(error);
        });
    });
}

export const deleteForm = (form) => (dispatch) => {
    dispatch(actions.deletingForm());
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/forms/delete/' + form.id
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((res) => {
            dispatch(actions.formDeleted());
            resolve(res);
        })
        .catch((error) => {
            dispatch(actions.formDeleted());
            reject(error);
        });
    });
}

// todo - no actions associated with deleteQuestion yet
export const deleteQuestion = (question) => (dispatch) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/forms/deleteQuestion/' + question.id
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

// todo - no actions for assinging forms yet
export const assignForms = (yearAndGradeObj) => (dispatch) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(yearAndGradeObj),
    }
    const url = envUrl + '/forms/assign'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}