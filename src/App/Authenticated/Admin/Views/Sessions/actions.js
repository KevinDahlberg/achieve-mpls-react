/** Sessions Actions */
import types from './types';

const deletingSession = () => ({
    type: types.DELETING_SESSION,
    deleting: true,
})

const sessionDeleted = () => ({
    type: types.SESSION_DELETED,
    deleting: false,
})

const addingSession = () => ({
    type: types.ADDING_SESSION,
    adding: true,
})

const sessionAdded = () => ({
    type: types.SESSION_ADDED,
    adding: false,
})

const updatingSession = () => ({
    type: types.UPDATING_SESSION,
    updating: true,
})

const sessionUpdated = () => ({
    type: types.SESSION_UPDATED,
    updating: false,
})

export default {
    deletingSession,
    sessionDeleted,
    addingSession,
    sessionAdded,
    updatingSession,
    sessionUpdated
}