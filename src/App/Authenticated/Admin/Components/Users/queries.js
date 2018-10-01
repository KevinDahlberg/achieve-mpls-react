/** Users Queries */
import { db } from '../../../../../firebase';

export const addNewUser = (user) => {
    let promiseArr = []
    promiseArr = [addNewUserToUsers(user)]
    for (const yr of user.years) {
        promiseArr.push(addNewUserToYears(user, yr))
    }
    return new Promise((resolve, reject) => {
        Promise.all(promiseArr)
        .then((response, reject) => {
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
    return new Promise((resolve, reject) => {
        db.collection('users').doc(user.id).delete()
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        })
    }) 
}

export const addNewYear = (details) => {
    const yearObj = { year: details.year, yearRange: details.yearRange };
    return new Promise((resolve, reject) => {
        db.collection('years').doc(details.year).set(yearObj)
        .then((response) => {
            let i;
            for (i = 0; i < details.sessions; i++) {
                const sessionObj = {
                    dayOfWeek: '',
                    events: [],
                    facilitator: '',
                    grade: '',
                    school: '',
                    session: i + 1,
                    startTime: '',
                    year: details.year,
                }
                db.collection('years').doc(details.year.toString()).collection('sessions').add(sessionObj);
            }
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}