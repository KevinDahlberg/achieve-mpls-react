/** Sessions Queries */
import fetch from 'isomorphic-fetch';

import { envUrl } from '../../../../constants';

export const addSession = (session) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(session),
    }
    const url = envUrl + '/sessions/add'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateSession = (session) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(session),
    }
    const url = envUrl + '/sessions/update';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const deleteSession = (session) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/sessions/delete/' + session.id;
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            resolve(data)
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        })
    })
}