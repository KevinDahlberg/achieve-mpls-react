import React, { Component } from 'react';
import moment from 'moment';
import { Button, Paper, DialogContainer } from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEvents, createEvent, updateEvent, deleteEvent } from './store/operations';
import { getForms } from '../Forms/store/operations';

import EventsTable from './components/EventsTable';
import SingleEvent from './components/SingleEvent';

const newEvent = {};

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

    componentWillMount() {
        const { fetchFormsIfNeeded, getEvents } = this.props
        const id = this.props.match.params.id;
        getEvents(id)
        .then((response) => {
            getForms()
            .then((res) => {
                // sets fetching to false so things will render
                this.setState({ fetching: false });
            });
        })
    }

    addEventHide = () => {
        this.setState({ addVisible: false });
    }

    addEventClick = () => {
        this.setState({ addVisible: true });
    }

    // the next 3 methods get a little long, and might be able to be abstracted out.
    addEvent = (event) => {
        const { formArray, eventsReducer, createEvent, getEvents } = this.props;
        event.open = moment(event.open).format('YYYY-MM-DD');
        event.close = moment(event.close).format('YYYY-MM-DD');
        const form = formArray.filter((form) => form.name === event.form)[0];
        event.form = form;
        event.formId = form.id;
        if (!eventsReducer.currentSession.events) {
            eventsReducer.currentSession.events = [];
        }
        eventsReducer.currentSession.events = [ ...eventsReducer.currentSession.events, event]
        createEvent(eventsReducer.currentSession)
        .then(() => {
            getEvents(eventsReducer.currentSession.id)
        })
        this.setState({ addVisible: false, singleEvent: newEvent });
    }

    submitEdit = (event, idx) => {
        const { formArray, eventsReducer, getEvents, updateEvent } = this.props;
        const session = eventsReducer.currentSession;
        event.open = moment(event.open).format('YYYY-MM-DD');
        event.close = moment(event.close).format('YYYY-MM-DD');
        const form = formArray.filter((form) => form.name === event.form)[0];
        event.form = form
        event.formId = form.id;
        const eventArray = session.events.map((ev, index) => {
            if (index === idx) {
                return event;
            }
            return ev;
        });
        session.events = eventArray;
        updateEvent(eventsReducer.currentSession)
        .then(() => {
            getEvents(eventsReducer.currentSession.id)
        })
        this.setState({ addVisible: false, singleEvent: newEvent });
    }

    deleteEvent = (event, idx) => {
        const { getEvents, eventsReducer, deleteEvent } = this.props;
        const session = eventsReducer.currentSession;
        const eventArray = session.events.filter((ev, index) => index !== idx);
        session.events = eventArray;
        deleteEvent(session)
        .then(() => {
            getEvents(session.id);
        });
    }

    editEvent = (event, index) => {
        this.setState({ editVisible: true, singleEvent: event, index });
    }

    render() {
        const { eventsReducer, formArray } = this.props;
        const { singleEvent, addVisible, editVisible, deleteVisible, index } = this.state;
        return(
            <div className="tab-wrapper">
                <div className="tab-title">
                    {eventsReducer.isFetchingEvents ? null : <h1>Events for Session {eventsReducer.currentSession.session}</h1>}
                </div>
                <div className='tab-items'>
                    <Paper zDepth={2} className='add-wrapper'>
                        <span className='add-text'>Add Event</span>
                        <Button floating primary className='add-button' onClick={this.addEventClick}>add</Button>
                    </Paper>
                </div>
                    {eventsReducer.isFetchingEvents ? null :
                        <div className="table-container">
                            <div>
                                <EventsTable 
                                    deleteEvent={this.deleteEvent}
                                    events={eventsReducer.currentSession.events}
                                    formArray={formArray}
                                    editEvent={this.editEvent}
                                />
                            </div>
                            <div>
                                {addVisible ?
                                    <SingleEvent
                                        event={singleEvent}
                                        formArray={formArray}
                                        hide={this.addEventHide}
                                        submitEvent={this.addEvent}
                                        type='Add'
                                        visible={addVisible}
                                    /> :
                                    null
                                }
                                {editVisible ?
                                    <SingleEvent
                                        event={singleEvent}
                                        index={index}
                                        visible={editVisible}
                                        hide={() => this.setState({ editVisible: false })}
                                        submitEvent={this.submitEdit}
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

const mapStateToProps = (state) => {
    return {
        eventsReducer: state.eventsReducer,
        sessions: state.adminReducer.sessions,
        currentYear: state.adminReducer.currentYear,
        formArray: state.adminReducer.forms,
    };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators(
        {   
            getForms,
            getEvents,
            createEvent,
            deleteEvent,
            updateEvent,
        }, 
        dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);