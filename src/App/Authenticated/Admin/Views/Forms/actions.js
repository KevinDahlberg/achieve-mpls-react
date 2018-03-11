/** forms Actions */
import types from './types';

const deletingForm = () => ({
    type: types.DELETING_FORM,
    deleting: true,
})

const formDeleted = () => ({
    type: types.FORM_DELETED,
    deleting: false,
})

const addingForm = () => ({
    type: types.ADDING_FORM,
    adding: true,
})

const formAdded = () => ({
    type: types.FORM_ADDED,
    adding: false,
})

const updatingForm = () => ({
    type: types.UPDATING_FORM,
    updating: true,
})

const formUpdated = () => ({
    type: types.FORM_UPDATED,
    updating: false,
})

export default {
    deletingForm,
    formDeleted,
    addingForm,
    formAdded,
    updatingForm,
    formUpdated
}