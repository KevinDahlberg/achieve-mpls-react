import clone from 'clone';
import moment from 'moment';

import { calculateCurrentYear } from '../../../../../../utils/years';

import * as types from './types';

const CURRENT_YEAR = calculateCurrentYear(moment().year());

const initialState = {
    currentYear: CURRENT_YEAR,
    years: [],
    isGettingYears: false,
    gettingYearsError: {},
}

function yearsReducer(state = clone(initialState), action) {
    switch(action.type) {
        case types.GET_YEARS_START:
            return { ...state, isGettingYears: true, gettingYearsError: {} };
        case types.GET_YEARS_SUCCESS:
            return { ...state, isGettingYears: false, years: action.data };
        case types.GET_YEARS_FAILURE:
            return { ...state, isGettingYears: false, gettingYearsError: {} };
        case types.SET_CURRENT_YEAR:
            return { ...state, currentYear: action.data };
        default:
            return state;
    }
}

export default yearsReducer;