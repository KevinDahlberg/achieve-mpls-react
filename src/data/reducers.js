import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ticketReducer from './ticketStore';
import authReducer from './authStore';

const rootReducer = combineReducers({
    ticketReducer,
    authReducer,
    routing: routerReducer,
});

export default rootReducer;