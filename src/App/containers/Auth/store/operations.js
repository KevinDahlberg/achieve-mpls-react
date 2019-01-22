import moment from 'moment';

import * as actions from './actions';
import firebase, { auth, db } from '../../../../firebase';

import { calculateCurrentYear } from '../../../../utils/years';
import { addNewUser, addNewUserToYears, updateUserInUsers } from '../../Authenticated/Admin/Users/store/operations';

const todaysDate = new Date();
const currentYear = calculateCurrentYear(todaysDate.getFullYear());

export const login = (email, password) => (dispatch) => {
    dispatch(actions.loginUserStart());
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (user) {
                db.collection("users").where("email", "==", email).get()
                .then((snap) => {
                    // gets data from snapshot
                    const user = snap.docs.map((doc) => doc.data())[0];
                    // there should only be 1 user per email in db.
                    dispatch(actions.loginUserSuccess(user));
                    resolve(user);
                });
            }
        })
        .catch(e => {
            reject(e);
            actions.loginUserFailure(e);
            console.error(e.message);
        });
    });
}
// addNewUser, addNewUserToYears, updateUserInUsers
export const signup = (email, password, fname, lname) => (dispatch) => {
    dispatch(actions.authenticateUserStart());
    const currYear = { session: '', year: currentYear.toString() }
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
                        const userYears = user.years ? user.years : [];
                        const userRole = user.role ? user.role : '';
                        const userObj = {
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email,
                            role: userRole,
                            years: [...userYears, currYear]
                        }
                        addNewUserToYears(userObj, currYear)
                        .then(res => {
                            dispatch(actions.authenticateUserSuccess(user));
                            resolve(user);
                        })
                    }
                    if (!user) {
                        const userObj = {
                            email, 
                            lname, 
                            fname,
                            role: '',
                            years: [currYear]
                        }
                        addNewUser(userObj)
                        .then(res => {
                            dispatch(actions.authenticateUserSuccess(userObj));
                            resolve(userObj);
                        })
                    }
                });
            }
        })
        .catch(e => {
            dispatch(actions.authenticateUserFailure(e));
            reject(e);
            console.error(e.message);
        })
    })
}

// sends out email to user so they can reset their password
export const forgotPW = (email) => (dispatch) => {
    dispatch(actions.forgotPWStart());
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email)
        .then((data) => {
            dispatch(actions.forgotPWSuccess());
            resolve(data)
        })
        .catch((error) => {
            dispatch(actions.forgotPWFailure(error));
            reject(error);
        })
    })
}


export const checkLogin = () => (dispatch) => {
    dispatch(actions.authenticateUserStart());
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
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email,
                            role: user.role,
                            years: user.years,
                        }
                        dispatch(actions.authenticateUserSuccess(userObj));
                    }
                    resolve(user);
                });
            } else {
                reject('no user logged in');
                dispatch(actions.authenticateUserFailure({error: 'no user logged in'}));
            }
        });
    })
}

export const logout = () => (dispatch) => {
    dispatch(actions.logoutUserStart());
    return new Promise ((resolve, reject) => {
        firebase.auth().signOut().then(() => {
            dispatch(actions.logoutUserSuccess());
            resolve();
        }).catch((error) => {
            dispatch(actions.logoutUserFailure(error));
            reject(error);
        })
    })
}

