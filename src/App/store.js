/** Authentication Queries */
import moment from 'moment';
import actions from './actions';
import { envUrl } from './constants';

export const login = (creds) => (dispatch) => {
    dispatch(actions.authenticating(true));
    const objToSend = {
        email: creds.email,
        password: creds.password,
    }
    //fetch object
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objToSend),
    }
    const url = envUrl
    return new Promise(function(resolve, reject) {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            const userObj = {
                user: data.username,
                role: data.role,
                session: data.session_count,
            }
            dispatch(actions.authenticateUser(userObj));
            resolve(data);
        })
        .catch((error) => {
            dispatch(actions.authenticating(false));
            reject(error);
        })
    })
}

export const forgotPW = (email) => (dispatch) => {
    // set expiration date of chance
    const chanceExpiration = new Date();
    chanceExpiration.setDate(chanceExpiration.getDate() + 30);
    const chance_expiration = moment(chanceExpiration).format('YYYY-MM-DD');
    const objToSend = {
        email: email,
        chance_expiration: chance_expiration,
    }

    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objToSend),
    }
    const url = envUrl + '/mail/forgotpw';
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

export const checkSession = () => (dispatch) => {
    dispatch(actions.authenticating(true));
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/users/clearance'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            const userObj = {
                user: data.username,
                role: data.role,
                session: data.session_count,
            }
            dispatch(actions.authenticateUser(userObj))
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.authenticating(false));
            reject(error);
        })
    })
}

export const logout = () => (dispatch) => {
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/logout'
    return new Promise ((resolve, reject) => {
        fetch(url, init)
        .then((response) => {
            dispatch(actions.userLoggedOut());
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}