import actions from './actions';
import { db } from '../../../../../../firebase';

export const getForms = () => (dispatch, getStore) => {
    console.log('store', getStore());
    dispatch(actions.getFormsStart());
    return new Promise((resolve, reject) => {
        db.collection("forms").get()
        .then((data) => {
            const forms = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.getFormsSuccess(forms))
            resolve(forms)
        })
        .catch((error) => {
            error.friendlyMessage = 'Failed to fetch forms';
            dispatch(actions.getFormsFailure(error));
            reject(error);
        })
    })
}

export const createForm = (form) => (dispatch, getStore) => {
    dispatch(actions.createFormStart());
    return new Promise((resolve, reject) => {
        db.collection('forms').add(form)
        .then((response) => {
            dispatch(actions.createFormSuccess());
            resolve(response);
        })
        .catch((error) => {
            error.friendlyMessage = 'Failed to add form';
            dispatch(actions.createFormFailure());
            reject(error);
        });
    });
}

export const updateForm = (form) => (dispatch, getStore) => {
    dispatch(actions.updateFormStart());
    return new Promise((resolve, reject) => {
        db.collection('forms').doc(form.id).update({...form})
        .then((response) => {
            actions.updateFormSuccess();
            resolve(response);
        })
        .catch((error) => {
            error.friendlyMessage = 'Failed to update form';
            actions.updateFormFailure(error);
            reject(error);
        });
    });
}

export const deleteForm = (form) => (dispatch, getStore) => {
    dispatch(actions.deleteFormStart());
    return new Promise((resolve, reject) => {
        db.collection('forms').doc(form.id).delete()
        .then((res) => {
            actions.deleteFormSuccess();
            resolve(res);
        })
        .catch((error) => {
            error.friendlyMessage = 'Failed to delete form';
            actions.deleteFormFailure(error);
            reject(error);
        });
    });
}

export const assignForm = (event) => async (dispatch, getStore) => {
    dispatch(actions.assignFormStart());
    const year = getStore().adminReducer.currentYear;
    try {
        const sessions = await db.collection('years').doc(year.toString()).collection('sessions').where('grade', '==', event.grade).get()
            .then((data) => {
                return data.docs.map((doc) => {
                    const docData = doc.data()
                    const id = doc.id;
                    return { ...docData, id }
                })
            })
        const addedEvent = sessions.map((session) => {
            if (!session.events) {
                session.events = [];
            }
            session.events = [ ...session.events, event ]
            return session;
        });
        for (const session of addedEvent) {
            await db.collection('years').doc(year.toString()).collection('sessions').doc(session.id).set(session);
        }
        dispatch(actions.assignFormSuccess());
    } catch (error) {
        console.error(error);
        error.friendlyMessage = 'Unable to assign sessions'
        dispatch(actions.createFormFailure(error));
    }
}

export const mapAssignedEvents = () => (dispatch, getStore) => {
    const store = getStore()
    const forms = store.formsReducer.forms;
    const sessions = store.sessionReducer.sessions;
    const adjusted = forms.map((form) => {
        const included = sessions.filter((session) => {
            const match = session.events.filter(event => event.formName === form.name)
            if (match.length > 0) {
                return match;
            }
        });
        if (included.length > 0) {
            return included;
        }
    })
}