import moment from 'moment'

export const calculateCurrentYear = (year) => {
    let currentYear = year;
    const endOfYear = '8/1/' + currentYear;
    if (moment().isBefore(endOfYear)){
        currentYear = currentYear - 1;
    }
    return currentYear
}