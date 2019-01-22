import { sortBy } from 'lodash'

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