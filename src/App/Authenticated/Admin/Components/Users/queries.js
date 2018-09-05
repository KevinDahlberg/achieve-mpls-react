/** Users Queries */
import { db } from '../../../../../firebase';


export const addNewUser = (user) => {
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

export const updateUser = (user) => {
    return new Promise((resolve, reject) => {
        db.collection('users').doc(user.id).update({...user})
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
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

export const getSingleUser = (user) => {
    return new Promise((resolve, reject) => {
        db.collection('users').where('email', '==', user.email).get()
        .then((data) => {
            const user = data.docs.map((doc) => {
                const docData = doc.data();
                const id = doc.id;
                return { ...docData, id}
            })[0];
            resolve(user);
        })
        .catch((error) => {
            reject(error);
        });
    });
}