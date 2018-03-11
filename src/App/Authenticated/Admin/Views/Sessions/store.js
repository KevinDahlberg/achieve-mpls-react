/** Sessions Queries */
import fetch from 'isomorphic-fetch';

import actions from './actions';
import { envUrl } from '../../../../constants';

export const addSession = (session) => (dispatch) => {
    dispatch(actions.addingSession());
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
            dispatch(actions.sessionAdded());
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.sessionAdded());
            reject(error);
        })
    })
}

export const updateSession = (session) => (dispatch) => {
    dispatch(actions.updatingSession());
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
            dispatch(actions.sessionUpdated())
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.sessionUpdated());
            reject(error);
        })
    })
}

export const deleteSession = (session) => (dispatch) => {
    dispatch(actions.deletingSession());
    const init = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/sessions/delete/' + session.id;
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((data) => {
            dispatch(actions.sessionDeleted())
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.sessionDeleted());
            reject(error);
        })
    })
}