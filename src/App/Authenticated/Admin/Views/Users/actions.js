/** Users Actions */
import types from './types';

const deletingUser = () => ({
    type: types.DELETING_USER,
    deleting: true,
})

const userDeleted = () => ({
    type: types.USER_DELETED,
    deleting: false,
})

const addingUser = () => ({
    type: types.ADDING_USER,
    adding: true,
})

const userAdded = () => ({
    type: types.USER_ADDED,
    adding: false,
})

const updatingUser = () => ({
    type: types.UPDATING_USER,
    updating: true,
})

const userUpdated = () => ({
    type: types.USER_UPDATED,
    updating: false,
})

export default {
    deletingUser,
    userDeleted,
    addingUser,
    userAdded,
    updatingUser,
    userUpdated
}