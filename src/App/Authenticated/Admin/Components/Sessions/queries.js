/** Sessions Queries */
import { db } from '../../../../../firebase';

export const addSession = (session) => {
    return new Promise((resolve, reject) => {
       db.collection('years').doc(session.year).collection('sessions').add(session)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateSession = (session) => {
    return new Promise((resolve, reject) => {
        db.collection('years').doc(session.year).collection('sessions').doc(session.id).update({...session})
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const deleteSession = (session, year) => {
    console.log('session', session, year);
    return new Promise((resolve, reject) => {
        db.collection('years').doc(year.toString()).collection('sessions').doc(session.id).delete()
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}