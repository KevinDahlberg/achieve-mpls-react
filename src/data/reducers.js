import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authStore';
import ticketReducer from './ticketStore';
import usersReducer from './usersStore';
import formReducer from './formStore';
import sessionReducer from './sessionStore';


const rootReducer = combineReducers({
    authReducer,
    ticketReducer,
    usersReducer,
    formReducer,
    sessionReducer,
    routing: routerReducer,
});

export default rootReducer;