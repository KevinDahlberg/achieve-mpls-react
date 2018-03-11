import moment from 'moment'

export const calculateCurrentYear = (year) => {
    let currentYear = year;
    const endOfYear = '8/1/' + currentYear;
    if (moment().isBefore(endOfYear)){
        currentYear = currentYear - 1;
    }
    return currentYear
}

export const prepareYearsForSelect = (years) => {
  const changedYears = years.map((year) => {
      const newYear = year.split(' ').slice(0,1);
      return newYear[0];
  })
  return changedYears
}

