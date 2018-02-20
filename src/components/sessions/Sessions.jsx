import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';
import {
    addSession,
    updateSession,
    deleteSession,
    fetchSessions,
    fetchSessionsIfNeeded, 
    getEvents } from '../../data/sessionStore';
import { fetchYearsIfNeeded } from '../../data/ticketStore'
import { newSession } from '../../constants';
import { prepareYearsForSelect } from '../../utils';

import SessionsTable from './SessionsTable';
import SingleSession from './SingleSession';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleSession: newSession,
            addVisible: false,
        }
    }

    componentDidMount() {
        const { currentYear, fetchSessionsIfNeeded, fetchYearsIfNeeded } = this.props;
        fetchSessionsIfNeeded(currentYear)
        .then(() => {
            fetchYearsIfNeeded();
        })
    }

    getEvents = (session) => {
        const { getEvents } = this.props;
        getEvents(session)
        .then((res) => {
            console.log(res);
        })
    }

    addSessionHide = () => {
        this.setState({ addVisible: false });
    }

    addSessionClick = () => {
        this.setState({ addVisible: true });
        console.log('add session clicked');
    }

    submitSession = (session) => {
        const { addSession, fetchSessions, currentYear, } = this.props;
        this.setState({ addVisible: false });
        addSession(session)
        .then((res) => {
            fetchSessions(currentYear)
            .then((res) => {
                console.log(res);
            });
        });
    }

    updateSession = (session) => {
        const { updateSession, fetchSessions, currentYear, } = this.props;
        updateSession(session)
        .then((res) => {
            fetchSessions(currentYear);
        });
    }

    deleteSession = (session) => {
        const { deleteSession, fetchSessions, currentYear, } = this.props;
        deleteSession(session)
        .then(() => {
            fetchSessions(currentYear);
        });
    }

    render() {
        const { sessions, formArray, years } = this.props;
        const { addVisible, singleSession } = this.state;
        const updatedYears = prepareYearsForSelect(years);
        return (
            <div className='tab-wrapper'>
                <div className='tab-title'>
                    <h2>Manage Sessions</h2>
                </div>
                <div className='tab-items'>
                    <Paper
                        zDepth={2}
                        className='add-wrapper'
                    >
                        <span className='add-text'>Add Session</span>
                        <Button floating primary className='add-button' onClick={this.addSessionClick}>add</Button>
                    </Paper>
                </div>
                <div className="table-container">
                    {sessions.length === 0 ? null :
                    <SessionsTable
                        deleteSession={this.deleteSession}
                        sessions={sessions}
                        getEvent={this.getEvents}
                        formArray={formArray}
                        years={updatedYears}
                        submitSession={this.updateSession}
                    />
                    }
                </div>
                    <SingleSession
                        hide={this.addSessionHide}
                        session={singleSession}
                        visible={addVisible}
                        submitSession={this.submitSession}
                        years={updatedYears}
                        type='Add'
                    />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sessions: state.sessionReducer.sessions,
    currentYear: state.ticketReducer.currentYear,
    formArray: state.formReducer.forms,
    years: state.ticketReducer.years,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {   
            addSession,
            updateSession,
            deleteSession,
            fetchYearsIfNeeded,
            fetchSessions,
            fetchSessionsIfNeeded,  
            getEvents,
        }, 
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Sessions);