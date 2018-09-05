/** Authentication Queries */
import moment from 'moment';
import actions from './actions';
import { envUrl } from './constants';
import firebase, { auth, db } from '../firebase';

export const login = (email, password) => (dispatch) => {
    dispatch(actions.authenticating(true));
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (user) {
                db.collection("users").where("email", "==", email).get()
                .then((snap) => {
                    // gets data from snapshot
                    const user = snap.docs.map((doc) => doc.data())[0];
                    // there should only be 1 user per email in db.
                    const userObj = {
                        firstName: user.fname,
                        lastName: user.lname,
                        email: user.email,
                        role: user.role,
                        years: user.years,
                    }
                    resolve(userObj);
                    dispatch(actions.authenticateUser(userObj));
                });
            }
        })
        .catch(e => {
            reject(e);
            console.error(e.message);
        });
    });
}

export const signup = (email, password, fname, lname) => (dispatch) => {
    dispatch(actions.authenticating(true));
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            if (user) {
                db.collection("users").where("email", "==", email).get()
                .then((snap) => {
                    // gets data from snapshot
                    const user = snap.docs.map((doc) => doc.data())[0];
                    // there should only be 1 user per email in db.
                    if (user) {
                        const userObj = {
                            firstName: user.fname,
                            lastName: user.lname,
                            email: user.email,
                            role: user.role,
                            years: user.years,
                        }
                        dispatch(actions.authenticateUser(userObj));
                        resolve(userObj);
                    }
                    if (!user) {
                        db.collection("users").doc().set({
                            email, lname, fname,
                        })
                    }
                });
            }
        })
        .catch(e => {
            reject(e);
            console.error(e.message);
        })
    })
}

// sends out email to user so they can reset their password
export const forgotPW = (email) => (dispatch) => {
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}


export const checkLogin = () => (dispatch) => {
    dispatch(actions.authenticating(true));
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.collection("users").where("email", "==", user.email).get()
                .then((snap) => {
                    // gets data from snapshot
                    const user = snap.docs.map((doc) => doc.data())[0];
                    // there should only be 1 user per email in db.
                    if (user) {
                        const userObj = {
                            firstName: user.fname,
                            lastName: user.lname,
                            email: user.email,
                            role: user.role,
                            years: user.years,
                        }
                        dispatch(actions.authenticateUser(userObj));
                    }
                    resolve(user);
                });
            } else {
                reject('no user logged in');
                dispatch(actions.authenticating(false));
            }
        });
    })
}

export const logout = () => (dispatch) => {
    return new Promise ((resolve, reject) => {
        firebase.auth().signOut().then(() => {
            dispatch(actions.userLoggedOut());
            resolve();
        }).catch((error) => {
            reject(error);
        })
    })
}