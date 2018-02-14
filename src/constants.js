//options for search filter
export const ticketOptions = {
    distance: 100,
    keys: [
        'day',
        'meeting_count',
        'email',
        'fname',
        'lname',
        'grade',
        'school',
        'session_count',
    ],
    location: 0,
    maxPatternLength: 32,
    minMatchCharLangth: 1,
    shouldSort: true,
    threshold: 0.6,
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

//blank items
export const newForm = {
    form_name: '',
    questions: [
        {question: 'On a scale of 1-10 (with 10 highest) how would you rate your session today?'}
    ],
}

export const newSession = {
    day: '',
    facilitator: '',
    grade: '',
    school: '',
    session_count: '',
    start_time: '',
    year: '', 
}

export const newEvent = {
    form_name: 'General Exit Ticket',
    date_form_open: new Date(),
    date_form_close: new Date(),
    meeting_count: '',
}

export const envUrl = 'http://localhost:5000'