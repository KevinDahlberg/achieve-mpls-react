/** Events Actions */
import types from './types';

const deletingEvent = () => ({
    type: types.DELETING_EVENT,
    deleting: true,
})

const eventDeleted = () => ({
    type: types.EVENT_DELETED,
    deleting: false,
})

const addingEvent = () => ({
    type: types.ADDING_EVENT,
    adding: true,
})

const eventAdded = () => ({
    type: types.EVENT_ADDED,
    adding: false,
})

const updatingEvent = () => ({
    type: types.UPDATING_EVENT,
    updating: true,
})

const eventUpdated = () => ({
    type: types.EVENT_UPDATED,
    updating: false,
})

export default {
    deletingEvent,
    eventDeleted,
    addingEvent,
    eventAdded,
    updatingEvent,
    eventUpdated
}