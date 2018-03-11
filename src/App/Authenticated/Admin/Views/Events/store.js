import fetch from 'isomorphic-fetch';
import { envUrl } from '../../../../constants';

import actions from './actions';

export const addEvent = (event) => (dispatch) => {
    dispatch(actions.addingEvent());
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
            dispatch(actions.eventAdded());
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.eventAdded());
            reject(error);
        })
    })
}

export const updateEvent = (event) => (dispatch) => {
    dispatch(actions.updatingEvent());
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
            dispatch(actions.eventUpdated());
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.eventUpdated());
            reject(error);
        })
    })
}

export const deleteEvent = (event) => (dispatch) => {
    dispatch(actions.deletingEvent());
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/events/delete/' + event.id
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((data) => {
            dispatch(actions.eventDeleted());
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.eventDeleted());
            reject(error);
        })
    })
}
