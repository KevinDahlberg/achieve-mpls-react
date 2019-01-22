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


