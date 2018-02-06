import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ticketReducer from './ticketStore';
import userReducer from './userStore';

const rootReducer = combineReducers({
    ticketReducer,
    userReducer,
    routing: routerReducer,
});

export default rootReducer;