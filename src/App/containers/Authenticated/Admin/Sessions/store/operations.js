import actions from './actions';

import { db } from '../../../../../../firebase';

export const getSessions = () => (dispatch, getStore) => {
    dispatch(actions.getSessionsStart());
    const year = getStore().adminReducer.currentYear;
    return new Promise((resolve, reject) => {
        db.collection('years').doc(year.toString()).collection('sessions').get()
        .then((data) => {
            const sessions = data.docs.map((doc) => {
                const docData = doc.data();
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.getSessionsSuccess(sessions));
            resolve(sessions);
        })
        .catch((error) => {
            dispatch(actions.getSessionsFailure(error));
            reject(error);
        })
    })
}

export const createSession = () => (dispatch, getStore) => {
    dispatch(actions.createSessionStart());
    const session = getStore().sessions.currentSession;
    return new Promise((resolve, reject) => {
        db.collection('years').doc(session.year).collection('sessions').add(session)
        .then((data) => {
            dispatch(actions.createSessionSuccess(data));
            resolve(data);
        })
        .catch((error) => {
            dispatch(actions.createSessionFailure(error));
            reject(error);
        });
    });
}

export const updateSession = () => (dispatch, getStore) => {
    const session = getStore().sessions.currentSession;
    dispatch(actions.updateSessionStart());
    return new Promise((resolve, reject) => {
        db.collection('years').doc(session.year).collection('sessions').doc(session.id).update({...session})
        .then((data) => {
            dispatch(actions.updateSessionSuccess(data));
            resolve(data);
        })
        .catch((error) => {
            dispatch(actions.updateSessionFailure(error));
            reject(error);
        });
    });
}

export const deleteSession = () => (dispatch, getStore) => {
    const year = getStore().adminReducer.currentYear;
    const session = getStore().sessions.currentSession;
    dispatch(actions.deleteSessionStart());
    return new Promise((resolve, reject) => {
        db.collection('years').doc(year.toString()).collection('sessions').doc(session.id).delete()
        .then((data) => {
            dispatch(actions.deleteSessionSuccess())
            resolve(data);
        })
        .catch((error) => {
            dispatch(actions.deleteSessionFailure(error));
            reject(error);
        });
    });
}

