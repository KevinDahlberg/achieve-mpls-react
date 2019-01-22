/** Queries for Coach */
import actions from './actions';
import { db } from '../../../../../firebase';
import moment from 'moment';

export const getExitTickets = () => (dispatch, getStore) => {
    dispatch(actions.getTicketsStart());
    const year = getStore().adminReducer.currentYear.toString();
    const userSession = getStore().authReducer.user.years.filter((yr) => yr.year === year)[0].session;
    return new Promise ((resolve, reject) => {
        db.collection('years').doc(year).collection('sessions').where('session', '==', userSession).get()
        .then((snap) => {
            const docData = snap.docs.map((doc) => doc.data())[0];
            if (docData) {
                const events = docData.events;
                dispatch(actions.getTicketsSuccess({ events, session: docData }))
                resolve(events);
            } else {
                dispatch(actions.getTicketsSuccess({ events: [], session: {} }));
                resolve([]);
            }
        })
        .catch((error) => {
            dispatch(actions.getTicketsFailure(error));
            reject(error);
        });
    });
}

export const getCompletedTickets = () => (dispatch, getStore) => {
    dispatch(actions.getCompletedStart());
    const year = getStore().adminReducer.currentYear;
    const email = getStore().authReducer.user.email;
    return new Promise((resolve, reject) => {
        db.collection('responses').where('year', '==', year).where('user.email', '==', email).get()
            .then((snap) => {
                const docData = snap.docs.map((doc) => doc.data());
                dispatch(actions.getCompletedSuccess(docData))
                resolve(docData);
            })
            .catch((error) => {
                dispatch(actions.getCompletedFailure(error));
                reject(error);
            })
    })
}

export const filterTickets = () => (dispatch, getStore) => {
    const tickets = getStore().coachReducer.tickets;
    const completed = getStore().coachReducer.completed;
    const open = filterOpenTickets(tickets);
    const openComplete = filterCompletedTickets(open, completed)
    dispatch(actions.setOpenTickets(openComplete));
    dispatch(actions.setCurrentTicket(openComplete[0]));
}

const filterCompletedTickets = (tickets, completed) => {
    const notCompleted = tickets.filter((ticket) => {
        const c = completed.filter((t) => t.event === ticket.event)[0];
        if (c) {
            return;
        }
        return ticket;
    });
    return notCompleted;
}

const filterOpenTickets = (tickets) => {
    return tickets.filter((ticket) => moment().isBetween(ticket.open, ticket.close));
}

export const submitExitTicket = () => (dispatch, getStore) => {
    dispatch(actions.submitTicketStart());
    const store = getStore();
    const currentTicket = store.coachReducer.currentTicket
    const year = store.adminReducer.currentYear;
    const session = store.coachReducer.session;
    const user = store.authReducer.user;
    const ticket = {
        date: new Date(),
        day: session.dayOfWeek,
        event: currentTicket.event,
        facilitator: session.facilitator,
        form: currentTicket.form.name,
        response: currentTicket.form.questions,
        school: session.school,
        session: session.session,
        user: {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
        },
        year: year
    }
    return request(db.collection('responses').doc().set(ticket))
        .then((response) => {
            dispatch(actions.submitTicketSuccess());
            return response;
        })
        .catch((error) => {
            dispatch(actions.submitTicketFailure(error));
            return error;
        })
}

export const setCurrentTicket = (ticket) => (dispatch, getStore) => {
    dispatch(actions.setCurrentTicket(ticket));
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