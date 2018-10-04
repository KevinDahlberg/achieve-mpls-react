import React, { Component } from 'react';
import moment from 'moment';
import { Button, Paper, DialogContainer } from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addEvent, deleteEvent, updateEvent } from './queries';
import { fetchSessionsIfNeeded, fetchFormsIfNeeded } from '../../store';

import { newEvent } from './constants';

import { EventsTable } from './EventsTable';
import { SingleEvent } from './SingleEvent';

class EventsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            fetching: true,
            singleEvent: newEvent,
            addVisible: false,
            editVisible: false,
            deleteVisible: false,
            currentSession: {}
        }
    }

    componentDidMount() {
        const { 
            fetchFormsIfNeeded, 
            fetchSessionsIfNeeded,
            sessions,
            currentYear } = this.props;
        const id = this.props.match.params.id;
        //turns out the session number isn't the same as the session's id
        //get sessions if it's a refresh
        fetchSessionsIfNeeded(currentYear)
        .then((res) => {
            let result;
            if (res) {
                result = res.filter((session) => session.id === id)[0]
            } else {
                result = sessions.filter((session) => session.id === id)[0];
            }
            return result;
        })
        .then((res) => {
            this.setState({ events: res.events, currentSession: res });
            //fetch forms for edit
            fetchFormsIfNeeded()
            .then((res) => {
                //sets fetching to false so things will render
                this.setState({ fetching: false });
            });
        });
    }

    addEventHide = () => {
        this.setState({ addVisible: false });
    }

    addEventClick = () => {
        this.setState({ addVisible: true });
    }

    // the next 3 methods get a little long, and might be able to be abstracted out.
    submitEvent = (event) => {
        const { formArray, sessions, getEvents } = this.props;
        event.open_date = moment(event.open).format('YYYY-MM-DD');
        event.close_date = moment(event.close).format('YYYY-MM-DD');
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
        const { formArray, sessions, getEvents } = this.props;
        event.open_date = moment(event.open).format('YYYY-MM-DD');
        event.close_date = moment(event.close).format('YYYY-MM-DD');
        const form_id = formArray.filter((form) => form.name === event.form);
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
        const { getEvents, sessions } = this.props;
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
        const { currentSession, fetching, events, singleEvent, addVisible, editVisible, deleteVisible } = this.state;
        return(
            <div className="tab-wrapper">
                <div className="tab-title">
                    <h1>Events for Session {currentSession.session}</h1>
                </div>
                <div className='tab-items'>
                    <Paper zDepth={2} className='add-wrapper'>
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
                                {addVisible ?
                                    <SingleEvent
                                        event={singleEvent}
                                        formArray={formArray}
                                        hide={this.addEventHide}
                                        submitEvent={this.submitEvent}
                                        type='Add'
                                        visible={addVisible}
                                    /> :
                                    null
                                }
                                {editVisible ?
                                    <SingleEvent
                                        event={singleEvent}
                                        visible={editVisible}
                                        hide={this.editHide}
                                        submitEvent={this.submitEvent}
                                        formArray={formArray}
                                        type='Edit'
                                    /> :
                                    null
                                }
                                {deleteVisible ?
                                    <DialogContainer
                                        title='Delete Event'
                                        id='delete-event-dialog'
                                        visible={deleteVisible}
                                        onHide={this.deleteHide}
                                        focusOnMount={false}
                                        portal={true}
                                        lastChild={true}
                                        disableScrollLocking={true}
                                        renderNode={document.body}
                                    >
                                        <p>Are you sure you want to delete Event {singleEvent.count}</p>
                                        <Button raised primary onClick={this.deleteEvent}>Yes</Button>
                                        <Button flat onClick={this.deleteHide}>Cancel</Button>
                                    </DialogContainer> :
                                    null
                                }
                            </div>
                         </div>
                    }
            </div>

        )
    }
}

const mapStateToProps = ({ adminReducer }) => ({
    sessions: adminReducer.sessions,
    currentYear: adminReducer.currentYear,
    formArray: adminReducer.forms,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(
        {   
            fetchSessionsIfNeeded,
            fetchFormsIfNeeded, 
        }, 
        dispatch
    )
);

export const Events = connect(mapStateToProps, mapDispatchToProps)(EventsContainer);