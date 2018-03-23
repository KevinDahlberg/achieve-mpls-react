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
} from './queries';
import {
    fetchYearsIfNeeded,
    fetchSessions,
    fetchSessionsIfNeeded,
    getEvents, 
} from '../../store'
import { newSession } from './constants';
import { prepareYearsForSelect } from '../../utils';

import SessionsTable from './Components/SessionsTable';
import SingleSession from './Components/SingleSession';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleSession: newSession,
            addVisible: false,
            fetching: true,
        }
    }

    componentDidMount() {
        const { currentYear, fetchSessionsIfNeeded, fetchYearsIfNeeded } = this.props;
        fetchSessionsIfNeeded(currentYear)
        .then(() => {
            fetchYearsIfNeeded()
            .then(() => {
                this.setState({ fetching: false })
            })
        })
    }

    getEvents = (session) => {
        const { getEvents } = this.props;
        getEvents(session)
    }

    addSessionHide = () => {
        this.setState({ addVisible: false });
    }

    addSessionClick = () => {
        this.setState({ addVisible: true });
    }

    submitSession = (session) => {
        const { fetchSessions, currentYear, } = this.props;
        this.setState({ addVisible: false });
        addSession(session)
        .then((res) => {
            fetchSessions(currentYear)
        });
    }

    updateSession = (session) => {
        const { fetchSessions, currentYear, } = this.props;
        updateSession(session)
        .then((res) => {
            fetchSessions(currentYear);
        });
    }

    deleteSession = (session) => {
        const { fetchSessions, currentYear, } = this.props;
        deleteSession(session)
        .then(() => {
            fetchSessions(currentYear);
        });
    }

    render() {
        const { sessions, formArray, years } = this.props;
        const { addVisible, singleSession, fetching } = this.state;
        const updatedYears = prepareYearsForSelect(years);
        return (
            <div className='tab-wrapper'>
                {fetching ? null :
                <div>
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
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sessions: state.adminReducer.sessions,
    currentYear: state.adminReducer.currentYear,
    formArray: state.adminReducer.forms,
    years: state.adminReducer.years,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchYearsIfNeeded,
            fetchSessions,
            fetchSessionsIfNeeded,  
            getEvents,
        }, 
        dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Sessions);