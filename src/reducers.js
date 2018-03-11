import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import reducers from './App/reducers'


const rootReducer = combineReducers({
    reducers,
    routing: routerReducer,
});

export default rootReducer;