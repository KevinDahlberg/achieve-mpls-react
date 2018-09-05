import moment from 'moment'
import { sortBy } from 'lodash'

export const calculateCurrentYear = (year) => {
    let currentYear = year;
    const endOfYear = '9/1/' + currentYear;
    if (moment().isBefore(endOfYear)){
        currentYear = currentYear - 1;
    }
    return currentYear
}

export const prepareYearsForSelect = (years) => {
  const changedYears = years.map((year) => {
      return year.yearRange;
  })
  return changedYears
}

// sorts an array of objects based on key and orders id desending or ascending
export const sortArray = (array, key, ascending) => {
    let sorted;
    // checks if the value is a number or not.
    if (parseInt(array[0][key]) == array[0][key]) {
        sorted = sortBy(array, ((item) => {
            return Number(item[key]);
        }))
    } else {
        sorted = sortBy(array, key);
    }
    return ascending ? sorted : sorted.reverse();
}

