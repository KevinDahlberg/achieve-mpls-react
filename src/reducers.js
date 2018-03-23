import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './App/reducer';
import adminReducer from './App/Authenticated/Admin/reducer';
import coachReducer from './App/Authenticated/Coach/reducer';


const rootReducer = combineReducers({
    authReducer,
    adminReducer,
    coachReducer,
    routing: routerReducer,
});

export default rootReducer;