import { sortBy } from 'lodash'

export const sortArray = (array, key, ascending) => {
    let sorted = sortBy(array, key);
    return ascending ? sorted : sorted.reverse();
}