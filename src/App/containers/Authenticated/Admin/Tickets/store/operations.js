import Fuse from 'fuse.js';

import * as actions from './actions';

import { db } from '../../../../../../firebase';

import { sortArray } from '../../../../../../utils/sorting';
import { ticketOptions } from '../../../../../../constants/fuse';

export const getTickets = () => (dispatch, getStore) => {
    dispatch(actions.getTicketsStart());
    const year = getStore().years.currentYear;

    return new Promise ((resolve, reject) => {
        db.collection('responses').where('year', '==', year).get()
        .then((data) => {
            const tickets = data.docs.map((doc) => {
                const docData = doc.data();
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.getTicketsSuccess(tickets));
            resolve(tickets);
        })
        .catch((error) => {
            dispatch(actions.getTicketsFailure(error));
            reject(error);
        })
    })
}

export const sortTickets = (key, ascending) => (dispatch, getStore) => {
    const { tickets } = getStore().tickets;
    const sortedTickets = sortArray(tickets, key, ascending);
    dispatch(actions.setSortedTickets(sortedTickets));
}

export const updateTicket = () => (dispatch, getStore) => {
    dispatch(actions.updateTicketStart());
}

export const deleteTicket = () => (dispatch, getStore) => {
    dispatch(actions.deleteTicketStart());
}

export const searchTickets = (search) => (dispatch, getStore) => {
    const { originalTickets } = getStore().tickets;
    const ticketsFused = new Fuse(originalTickets, ticketOptions);
    const searchResults = ticketsFused.search(search);
    const data = {
        searchString: search,
        tickets: searchResults,
    }
    dispatch(actions.setSearchTickets(data));
}

export const paginateTickets = (start, rowsPerPage) => (dispatch, getStore) => {
    const { originalTickets, searchString, searchedTickets } = getStore().tickets;
    if (searchString.length > 0) {
        const sliced = searchedTickets.slice(start, start + rowsPerPage);
        dispatch(actions.setPaginationTickets(sliced));
        return;
    }
    const sliced = originalTickets.slice(start, start + rowsPerPage);
    dispatch(actions.setPaginationTickets(sliced));
}