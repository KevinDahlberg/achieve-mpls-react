/** Queries for Coach */
import fetch from 'isomorphic-fetch';
import { envUrl } from '../../constants';
import actions from './actions';

export const getExitTickets = (session, id) => (dispatch) => {
    dispatch(actions.fetchingExitTickets(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = envUrl + '/coach/' + session + '/' + id;
    return new Promise ((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(actions.exitTicketsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(actions.fetchingExitTickets(false));
            reject(error);
        });
    });
}