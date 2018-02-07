import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authStore';
import ticketReducer from './ticketStore';
import usersReducer from './usersStore';


const rootReducer = combineReducers({
    authReducer,
    ticketReducer,
    usersReducer,
    routing: routerReducer,
});

export default rootReducer;