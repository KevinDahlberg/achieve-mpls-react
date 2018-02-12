import fetch from 'isomorphic-fetch';

const FETCHING_FORMS = 'FETCHING_FORMS';
const FORMS_RECEIVED = 'FORMS_RECEIVED';

const initialState = {
    fetchingForms: false,
    forms: [],
    formsReceived: false,
}

const fetchingForms = (bool) => {
    return {type: FETCHING_FORMS, fetchingForms: bool};
}

const formsReceived = (formArray) => {
    return {
        type: FORMS_RECEIVED,
        fetchingForms: false,
        forms: formArray,
        formsReceived: true,
    }
}

export const getForms = () => (dispatch) => {
    dispatch(fetchingForms(true))
    const init = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    }
    const url = 'http://localhost:5000/forms'
    return new Promise((resolve, reject) => {
        fetch(url, init)
        .then(response => response.json())
        .then((data) => {
            dispatch(formsReceived(data))
            return data;
        })
        .then((data) => resolve(data))
        .catch((error) => {
            dispatch(fetchingForms(false));
            reject(error);
        })
    })
}

function formReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_FORMS:
        return {
            ...state,
            fetchingForms: action.fetchingForms,
        }
        case FORMS_RECEIVED:
        return {
            ...state,
            fetchingForms: action.fetchingForms,
            forms: action.forms,
            formsReceived: action.formsReceived,
        }
        default:
            return state;
    }
}

export default formReducer;