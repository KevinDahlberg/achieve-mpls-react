/** Sessions Queries */
import { db } from '../../../../../firebase';

export const addSession = (session, year) => {
    return new Promise((resolve, reject) => {
       db.collection('years').doc(year.toString()).add(session)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const updateSession = (session, year) => {
    return new Promise((resolve, reject) => {
        db.collection('years').doc(year.toString()).update({...session})
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const deleteSession = (session, year) => {
    return new Promise((resolve, reject) => {
        db.collection('years').doc(session.id).delete()
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error);
        })
    })
}