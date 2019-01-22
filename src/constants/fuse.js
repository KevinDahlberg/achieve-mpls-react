export const ticketOptions = {
    distance: 100,
    keys: [
        'day',
        'event',
        'user.email',
        'user.fname',
        'user.lname',
        'grade',
        'school',
        'session',
        'facilitator',
    ],
    location: 0,
    maxPatternLength: 32,
    minMatchCharLangth: 1,
    shouldSort: true,
    threshold: 0,
}

export const usersOptions = {
    distance: 100,
    keys: [
        'fname',
        'lname',
    ],
    location: 0,
    maxPatternLength: 32,
    minMatchCharLangth: 1,
    shouldSort: true,
    threshold: 0.6,
}