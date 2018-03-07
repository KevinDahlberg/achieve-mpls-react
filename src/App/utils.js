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
/**
* @desc generate the random pwd
* @param the length of the pwd
* @return Interger -> String
*/
function dec2hex(dec) {
  return ('0' + dec.toString(16)).substr(-2);
}

export function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

