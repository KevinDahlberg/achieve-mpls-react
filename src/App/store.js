/** Authentication Queries */
import moment from 'moment';
import actions from './actions';
import { envUrl } from './constants';

export const login = (creds) => (dispatch) => {
    dispatch(actions.authenticating(true));
    const objToSend = {
        username: creds.email,
        password: creds.password,
    }
    //fetch object
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objToSend),
    }
    const url = envUrl + '/auth';
    return new Promise(function(resolve, reject) {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            const userObj = {
                user: data.username,
                role: data.role,
                session: data.session_count,
                userId: data.user_id,
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

// sends out email to user so they can reset their password
export const forgotPW = (email) => (dispatch) => {
    console.log('forgot pw');
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
    const url = envUrl + '/pwregister/forgotpw';
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => response.json())
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

// add a new pw
export const addPW = (password, user) => {
    console.log(password, user);
    const objectToSend = { password: password, id: user.id }
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objectToSend),
    }
    const url = envUrl + '/pwregister/addPwd'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => response.json())
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

// checks token with database, gets user
export const checkToken = (token) => {
    const objectToSend = {
        token: token,
        date: moment().format('MM-DD-YYYY'),
    }
    const init = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(objectToSend),
    }
    const url = envUrl + '/pwregister'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then((response) => response.json())
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
    const url = envUrl + '/auth/clearance'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        // .then(response => response.json())
        .then(response => response.json())
        .then((data) => {
            const userObj = {
                user: data.username,
                role: data.role,
                session: data.session_count,
                userId: data.user_id,
            }
            console.log(userObj);
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