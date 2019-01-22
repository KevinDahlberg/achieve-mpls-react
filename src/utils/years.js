import moment from 'moment';

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



