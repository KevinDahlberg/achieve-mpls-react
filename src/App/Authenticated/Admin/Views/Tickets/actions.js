/** Tickets Actions */
import types from './types';

const deletingTicket = () => ({
    type: types.DELETING_TICKET,
    deleting: true,
})

const ticketDeleted = () => ({
    type: types.TICKET_DELETED,
    deleting: false,
})

const addingTicket = () => ({
    type: types.ADDING_TICKET,
    adding: true,
})

const ticketAdded = () => ({
    type: types.TICKET_ADDED,
    adding: false,
})

const updatingTicket = () => ({
    type: types.UPDATING_TICKET,
    updating: true,
})

const ticketUpdated = () => ({
    type: types.TICKET_UPDATED,
    updating: false,
})

export default {
    deletingTicket,
    ticketDeleted,
    addingTicket,
    ticketAdded,
    updatingTicket,
    ticketUpdated
}