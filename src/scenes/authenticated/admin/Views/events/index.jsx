import React, { Component } from 'react';
import moment from 'moment';
import {
    Button,
    Paper,
} from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    addEvent,
    deleteEvent,
    getEvents,
    updateEvent,
    fetchSessionsIfNeeded,
} from '../../data/sessionStore';
import { fetchFormsIfNeeded } from '../../data/formStore';

import { newEvent } from '../../constants';

import EventsTable from './Components/EventsTable';
import SingleEvent from './Components/SingleEvent';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            fetching: false,
            singleEvent: newEvent,
            addVisible: false,
        }
    }

    componentDidMount() {
        this.setState({ fetching: true });
        this.dbCallsForComponent();
    }

    dbCallsForComponent() {
        const { 
            getEvents, 
            fetchFormsIfNeeded, 
            fetchSessionsIfNeeded,
            sessions,
            currentYear } = this.props;
        const id = Number(this.props.match.params.id);
        //turns out the session number isn't the same as the session's id
        //get sessions if it's a refresh
        fetchSessionsIfNeeded(currentYear)
        .then((res) => {
            let result;
            if (res) {
                const currentSession = res.filter((session) => session.session_count === id)
                result = currentSession[0].id;
            } else {
                const currentSession = sessions.filter((session) => session.session_count === id)
                result = currentSession[0].id;
            }
            return result;
        })
        .then((res) => {
            //get events with new session id
            getEvents(res)
            .then((res) => {
                this.setState({ events: res });
                //fetch forms for edit
                fetchFormsIfNeeded()
                .then((res) => {
                    //sets fetching to false so things will render
                    this.setState({ fetching: false });
                })
            })
        });
    }

    addEventHide = () => {
        this.setState({ addVisible: false });
    }

    addEventClick = () => {
        this.setState({ addVisible: true });
    }

    submitEvent = (event) => {
        const { addEvent, formArray, sessions, getEvents } = this.props;
        event.open_date = moment(event.date_form_open).format('YYYY-MM-DD');
        event.close_date = moment(event.date_form_close).format('YYYY-MM-DD');
        const form_id = formArray.filter((form) => form.form_name === event.form_name);
        event.form_id = form_id[0].id;
        const id = Number(this.props.match.params.id);
        const session_id = sessions.filter((session) => session.session_count === id)
        event.session_id = session_id[0].id;
        addEvent(event)
        .then((res) => {
            const id = Number(this.props.match.params.id);
            const currentSession = sessions.filter((session) => session.session_count === id);
            const result = currentSession[0].id;
            getEvents(result)
            .then((data) => {
                this.setState({ events: data });
            })
        })
        this.setState({ addVisible: false, singleEvent: newEvent });
    }

    submitEdit = (event) => {
        const { updateEvent, formArray, sessions, getEvents } = this.props;
        event.open_date = moment(event.date_form_open).format('YYYY-MM-DD');
        event.close_date = moment(event.date_form_close).format('YYYY-MM-DD');
        const form_id = formArray.filter((form) => form.form_name === event.form_name);
        event.form_id = form_id[0].id;
        const id = Number(this.props.match.params.id);
        const session_id = sessions.filter((session) => session.session_count === id)
        event.session_id = session_id[0].id;
        updateEvent(event)
        .then((res) => {
            const id = Number(this.props.match.params.id);
            const currentSession = sessions.filter((session) => session.session_count === id);
            const result = currentSession[0].id;
            getEvents(result)
            .then((data) => {
                this.setState({ events: data });
            })
        })
    }

    deleteEvent = (event) => {
        const { deleteEvent, getEvents, sessions } = this.props;
        deleteEvent(event)
        .then((res) => {
            const id = Number(this.props.match.params.id);
            const currentSession = sessions.filter((session) => session.session_count === id);
            const result = currentSession[0].id;
            getEvents(result)
            .then((data) => {
                this.setState({ events: data });
            });
        });
    }

    render() {
        const { formArray } = this.props;
        const { fetching, events, singleEvent, addVisible } = this.state;
        return(
            <div className="tab-wrapper">
                <div className="tab-title">
                    <h1>Events for Session {this.props.match.params.id}</h1>
                </div>
                <div className='tab-items'>
                    <Paper
                        zDepth={2}
                        className='add-wrapper'
                    >
                        <span className='add-text'>Add Event</span>
                        <Button floating primary className='add-button' onClick={this.addEventClick}>add</Button>
                    </Paper>
                </div>
                    {fetching ? null :
                        <div className="table-container">
                            <div>
                                <EventsTable 
                                    deleteEvent={this.deleteEvent}
                                    events={events}
                                    formArray={formArray}
                                    submitEdit={this.submitEdit}
                                />
                            </div>
                            <div>
                                <SingleEvent
                                    event={singleEvent}
                                    formArray={formArray}
                                    hide={this.addEventHide}
                                    submitEvent={this.submitEvent}
                                    type='Add'
                                    visible={addVisible}
                                />
                            </div>
                        </div>
                    }
                </div>
        )
    }
}

const mapStateToProps = state => ({
    sessions: state.sessionReducer.sessions,
    currentYear: state.ticketReducer.currentYear,
    formArray: state.formReducer.forms,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(
        {   
            addEvent,
            deleteEvent,
            getEvents,
            updateEvent,
            fetchSessionsIfNeeded,
            fetchFormsIfNeeded, 
        }, 
        dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(Events);