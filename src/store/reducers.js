import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from '../App/containers/Auth/store/reducer';
import coach from '../App/containers/Authenticated/Coach/store/reducer';
import events from '../App/containers/Authenticated/Admin/Events/store/reducer';
import forms from '../App/containers/Authenticated/Admin/Forms/store/reducer';
import sessions from '../App/containers/Authenticated/Admin/Sessions/store/reducer';
import tickets from '../App/containers/Authenticated/Admin/Tickets/store/reducer';
import years from '../App/containers/Authenticated/Admin/Years/store/reducer';

const rootReducer = combineReducers({
    auth,
    coach,
    events,
    forms,
    sessions,
    tickets,
    years,
    routing: routerReducer,
});

export default rootReducer;