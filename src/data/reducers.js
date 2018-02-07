import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authStore';
import ticketReducer from './ticketStore';
import usersReducer from './usersStore';
import formReducer from './formStore';


const rootReducer = combineReducers({
    authReducer,
    ticketReducer,
    usersReducer,
    formReducer,
    routing: routerReducer,
});

export default rootReducer;