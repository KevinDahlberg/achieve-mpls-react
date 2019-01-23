import Fuse from 'fuse.js';

import * as actions from './actions';

/** Users Queries */
import { db } from '../../../../../../firebase';

import { sortArray } from '../../../../../../utils/sorting';
import { usersOptions } from '../../../../../../constants/fuse';

export const addNewUser = (user) => {
    let promiseArr = []
    promiseArr = [addNewUserToUsers(user)]
    for (const yr of user.years) {
        promiseArr.push(addNewUserToYears(user, yr))
    }
    return new Promise((resolve, reject) => {
        Promise.all(promiseArr)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const addNewUserToUsers = (user) => {
    return new Promise((resolve, reject) => {
        db.collection('users').add(user)
        .then((response) => {
          resolve(response);  
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const addNewUserToYears = (user, year) => {
    return new Promise((resolve, reject) => {
        const newUser = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            role: user.role,
            session: year.session,
        }
        db.collection('years').doc(year.year).collection('users').add(newUser)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const getSingleUser = (user) => {
    return new Promise((resolve, reject) => {
        db.collection('users').where('email', '==', user.email).get()
        .then((data) => {
            const usr = data.docs.map((doc) => {
                const docData = doc.data();
                const id = doc.id;
                return { ...docData, id }
            })
            resolve(usr[0]);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateUser = (user) => {
    let promiseArr = []
    promiseArr = [updateUserInUsers(user)]
    for (const yr of user.years) {
        promiseArr.push(updateUserInYears(user, yr))
    }
    return new Promise((resolve, reject) => {
        Promise.all(promiseArr)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const updateUserInUsers = (user) => {
    const { id, userId, ...userObj } = user
    return new Promise((resolve, reject) => {
        db.collection('users').doc(user.userId).update({ ...userObj })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateUserInYears = (user, year) => {
    return new Promise((resolve, reject) => {
        const updatedUser = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            role: user.role,
            session: year.session,
        }
        db.collection('years').doc(year.year).collection('users').doc(user.yearsId).update({ ...updatedUser })
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const deleteUser = (user) => {
    let promiseArr = []
    promiseArr = [deleteUserInUsers(user)]
    for (const yr of user.years) {
        promiseArr.push(deleteUserInYears(user, yr))
    }
    return new Promise((resolve, reject) => {
        Promise.all(promiseArr)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

const deleteUserInUsers = (user) => {
    return new Promise((resolve, reject) => {
        db.collection('users').doc(user.userId).delete()
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

const deleteUserInYears = (user, year) => {
    return new Promise((resolve, reject) => {
        db.collection('years').doc(year.year).collection('users').doc(user.yearsId).delete()
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const getUsers = () => (dispatch, getStore) => {
    //todo set up backend to filter out users based on year
    dispatch(actions.getUsersStart())
    const { currentYear } = getStore().years;
    return new Promise((resolve, reject) => {
        db.collection('years').doc(currentYear.toString()).collection('users').get()
        .then((data) => {
            const users = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.getUsersSuccess(users));
            resolve(users);
        })
        .catch((error) => {
            dispatch(actions.getUsersFailure(error));
            reject(error);
        })
    })
}

export const searchUsers = (search) => (dispatch, getStore) => {
    const { originalUsers } = getStore().users;
    const usersFused = new Fuse(originalUsers, usersOptions);
    const searchResults = usersFused.search(search);
    const data = {
        searchString: search,
        users: searchResults,
    }
    dispatch(actions.setSearchUsers(data));
}

export const sortUsers = (key, ascending) => (dispatch, getStore) => {
    const { users } = getStore().users;
    const sortedUsers = sortArray(users, key, ascending);
    dispatch(actions.setSortedUsers(sortedUsers));
}

export const paginateUsers = (start, rowsPerPage) => (dispatch, getStore) => {
    const { originalUsers, searchString, searchedUsers } = getStore().users;
    if (searchString.length > 0) {
        const sliced = searchedUsers.slice(start, start + rowsPerPage);
        dispatch(actions.setPaginationUsers(sliced));
    }
    const sliced = originalUsers.slice(start, start + rowsPerPage);
    dispatch(actions.setPaginationUsers(sliced));
}
