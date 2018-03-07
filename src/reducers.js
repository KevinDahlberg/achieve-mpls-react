import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reducers from './App'


const rootReducer = combineReducers({
    reducers,
    routing: routerReducer,
});

export default rootReducer;