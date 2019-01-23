import * as actions from './actions';

import { db } from '../../../../../../firebase';

export const getYears = () => (dispatch) => {
    dispatch(actions.getYearsStart())
    return new Promise ((resolve, reject) => {
        db.collection('years').get()
        .then(data => {
            const years = data.docs.map((doc) => {
                const docData = doc.data()
                const id = doc.id;
                return { ...docData, id }
            });
            dispatch(actions.getYearsSuccess(years))
            resolve(years)
        })
        .catch((error) => {
            dispatch(actions.getYearsFailure(error));
            reject(error);
        })
    })
}

export const addNewYear = (details) => {
    const yearObj = { year: details.year, yearRange: details.yearRange };
    return new Promise((resolve, reject) => {
        db.collection('years').doc(details.year).set(yearObj)
        .then((response) => {
            let i;
            for (i = 0; i < details.sessions; i++) {
                const sessionObj = {
                    dayOfWeek: '',
                    events: [],
                    facilitator: '',
                    grade: '',
                    school: '',
                    session: i + 1,
                    startTime: '',
                    year: details.year,
                }
                db.collection('years').doc(details.year.toString()).collection('sessions').add(sessionObj);
            }
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        })
    })
}


