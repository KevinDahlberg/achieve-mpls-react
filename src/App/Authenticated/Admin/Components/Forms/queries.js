/** Form Queries */
import fetch from 'isomorphic-fetch';
import { envUrl } from '../../../../constants';

export const addForm = (form) => {
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
            console.error(error);
            reject(error);
        });
    });
}

export const updateForm = (form) => {
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
            console.error(error);
            reject(error);
        });
    });
}

export const deleteForm = (form) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/forms/delete/' + form.id
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

export const deleteQuestion = (question) => {
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
            console.error(error);
            reject(error);
        });
    });
}

export const assignForms = (yearAndGradeObj) => {
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
            console.error(error);
            reject(error);
        });
    });
}