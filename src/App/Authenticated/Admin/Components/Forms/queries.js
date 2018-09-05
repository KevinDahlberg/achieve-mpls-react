/** Form Queries */
import { db } from '../../../../../firebase';

export const addForm = (form) => {
    return new Promise((resolve, reject) => {
        db.collection('forms').add(form)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const updateForm = (form) => {
    return new Promise((resolve, reject) => {
        db.collection('forms').update({...form})
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

export const deleteForm = (form) => {
    return new Promise((resolve, reject) => {
        db.collection('forms').doc(form.id).delete()
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

export const assignForms = (yearAndGradeObj) => {
    return new Promise((resolve, reject) => {
        db.collection().doc().add()
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}