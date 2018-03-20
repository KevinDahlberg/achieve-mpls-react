import fetch from 'isomorphic-fetch';
import { envUrl } from '../../../../constants';

export const addEvent = (event) => {
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(event),
    }
    const url = envUrl + '/events/add'
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

export const updateEvent = (event) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(event),
    }
    const url = envUrl + '/events/update'
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

export const deleteEvent = (event) => {
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/events/delete/' + event.id
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
