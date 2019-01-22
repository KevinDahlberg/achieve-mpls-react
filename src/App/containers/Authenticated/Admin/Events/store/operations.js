import actions from './actions';
import { db } from '../../../../../../firebase';

export const getEvents = (sessionId) => (dispatch, getStore) => {
    dispatch(actions.getEventStart());
    const year = getStore().adminReducer.currentYear.toString();
    const query = db.collection('years').doc(year).collection('sessions').doc(sessionId).get()
    return request(query)
        .then((doc) => {
            const docData = doc.data()
            const id = doc.id;
            const session = { ...docData, id }

            dispatch(actions.getEventSuccess(session))
            return session;
        })
        .catch((err) => {
            err.message = 'Unable to get events';
            dispatch(actions.getEventFailure(err));
            return err;
        })
}

export const createEvent = (session) => (dispatch, getStore) => {
    dispatch(actions.createEventStart());
    const year = getStore().adminReducer.currentYear.toString();
    const query = db.collection('years').doc(year).collection('sessions').doc(session.id).set(session);
    return request(query)
        .then((response) => {
            dispatch(actions.createEventSuccess());
            return response;
        })
        .catch((err) => {
            err.message = 'Unable to create event';
            dispatch(actions.createEventFailure(err));
            return err;
        })
}

export const updateEvent = (session) => (dispatch, getStore) => {
    dispatch(actions.updateEventStart());
    const year = getStore().adminReducer.currentYear.toString();
    const query = db.collection('years').doc(year).collection('sessions').doc(session.id).set(session);
    return request(query)
        .then((response) => {
            dispatch(actions.updateEventSuccess());
            return response;
        })
        .catch((err) => {
            err.message = 'Unable to update event';
            dispatch(actions.updateEventFailure(err));
            return err;
        })
}

export const deleteEvent = (session) => (dispatch, getStore) => {
    dispatch(actions.deleteEventStart());
    const year = getStore().adminReducer.currentYear.toString();
    const query = db.collection('years').doc(year).collection('sessions').doc(session.id).set(session);
    return request(query)
        .then((response) => {
            dispatch(actions.deleteEventSuccess());
            return response;
        })
        .catch((err) => {
            err.message = 'Unable to update event';
            dispatch(actions.deleteEventFailure(err));
            return err;
        })
}

const request = (query) => {
    return new Promise((resolve, reject) => {
        query
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error);
        });
    });
}