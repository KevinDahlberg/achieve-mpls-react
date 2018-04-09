/** Users Queries */
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { generateId } from './utils';
import { envUrl } from '../../../../constants';

export const addNewUser = (user) => {
    user.password = generateId(10);
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(user),
    }
    const url = envUrl + '/users/postUser';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateUser = (user) => {
    const init = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(user),
    }
    const url = envUrl + '/users/updateUser';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

// might need to move this DB call, not necessarily related to users, also used by Login components
export const resetPW = (user) => {
    const chanceExpiration = new Date();
    chanceExpiration.setDate(chanceExpiration.getDate() + 30);
    user.chance_expiration = moment(chanceExpiration).format('YYYY-MM-DD');
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    // obj needs id, email, and chance 
    const url = envUrl + '/mail'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const deleteUser = (user) => {
    const userId = user.id;
    const adminUrl = envUrl + '/users/delete/' + userId
    const coachUrl = envUrl + '/users/deactivateUser'
    return new Promise((resolve, reject) => {
        if (user.role === 'admin') {
            const init = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }
            fetch(adminUrl, init)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        } else {
            const init = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(user),
            }
            fetch(coachUrl, init)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            })
        }
    })   
}