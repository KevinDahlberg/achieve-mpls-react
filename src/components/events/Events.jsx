import React, { Component } from 'react';
import {
    Button,
    Paper,
} from 'react-md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEvents, fetchSessionsIfNeeded } from '../../data/sessionStore';
import { fetchFormsIfNeeded } from '../../data/formStore';

import { newEvent } from '../../constants';

import EventsTable from './EventsTable';
import SingleEvent from './SingleEvent';

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
        const { getEvents, 
                fetchFormsIfNeeded, 
                fetchSessionsIfNeeded,
                sessions,
                currentYear } = this.props;
        this.setState({ fetching: true });
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
                console.log(res);
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
        this.setState({ addVisible: false, singleEvent: newEvent });
    }

    render() {
        const { formArray } = this.props;
        console.log(formArray);
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
                                    events={events}
                                    formArray={formArray}
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
        { getEvents, fetchFormsIfNeeded, fetchSessionsIfNeeded }, dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(Events);