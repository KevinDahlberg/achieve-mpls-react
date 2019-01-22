import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Paper, DialogContainer } from 'react-md';
import { withRouter } from 'react-router-dom';

// Components
import YearMenu from '../../../../components/YearMenu';

import { createSession, getSessions, updateSession, deleteSession } from './store/operations';

import { prepareYearsForSelect } from '../../../../../utils/years';

import SessionsTable from './components/SessionsTable';
import SingleSession from './components/SingleSession';

const newSession = {}

class SessionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleSession: newSession,
            addVisible: false,
            editVisible: false,
            deleteVisible: false,
            fetching: true,
        }
    }

    componentDidMount() {
        const { getSessions } = this.props;
        getSessions()
        .then(() => {
            this.setState({ fetching: false })
        })
    }

    addSessionHide = () => {
        this.setState({ addVisible: false });
    }

    addSessionClick = () => {
        this.setState({ addVisible: true });
    }

    deleteSession = () => {
        const { getSessions, currentYear } = this.props;
        const { singleSession } = this.state;
        this.hideDeleteSession();
        deleteSession(singleSession, currentYear)
        .then(() => {
            getSessions();
        });
    }

    hideDeleteSession = () => {
        this.setState({ deleteVisible: false });
    }

    hideEditSession = () => {
        this.setState({ editVisible: false });
    }

    onYearChange = (year) => {
        const { years, getSessions } = this.props;
        this.setState({ fetching: true });
        const selectedYear = years.filter(yr => yr.yearRange === year)[0]
        getSessions(parseFloat(selectedYear.year))
        .then((res) => {
            this.setState({ fetching: false });
        });
    }

    prepareYearForSelect = (year) => {
        return year.toString() + ' - ' + (parseInt(year) + 1)
    }

    showDeleteSession = (session) => {
        this.setState({ deleteVisible: true, editVisible: false, singleSession: session });
    }

    showEditSession = (session) => {
        this.setState({ editVisible: true, singleSession: session });
    }

    submitSession = (session) => {
        const { fetchSessions, currentYear, } = this.props;
        session.year = session.year.split(' ').slice(0,1)[0];
        this.setState({ addVisible: false });
        createSession(session)
        .then((res) => {
            fetchSessions(currentYear)
        });
    }

    submitEditSession = (session) => {
        const { fetchSessions, currentYear, } = this.props;
        session.year = session.year.split(' ').slice(0,1)[0];
        this.setState({ editVisible: false });
        updateSession(session)
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

    viewEvent = (sessionId) => {
        const { history } = this.props;
        history.push('/admin/events/' + sessionId);
    }

    render() {
        const { sessions, formArray, years, currentYear } = this.props;
        const { addVisible, deleteVisible, editVisible, singleSession, fetching } = this.state;
        const updatedYears = prepareYearsForSelect(years);
        singleSession.year = this.prepareYearForSelect(singleSession.year);
        return (
            <div className='tab-wrapper'>
                {fetching ? null :
                <div>
                    <div className='tab-title'>
                        <h2>Manage Sessions</h2>
                        <YearMenu
                            years={years}
                            currentYear={currentYear}
                            onYearChange={this.onYearChange}
                        />
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
                            editSession={this.showEditSession}
                            deleteSession={this.showDeleteSession}
                            sessions={sessions}
                            getEvent={this.getEvents}
                            formArray={formArray}
                            years={updatedYears}
                            submitSession={this.updateSession}
                            viewEvent={this.viewEvent}
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
                    {editVisible ?
                        <SingleSession
                            session={singleSession}
                            submitSession={this.submitEditSession}
                            visible={editVisible}
                            hide={this.hideEditSession}
                            type={'Edit'}
                            years={updatedYears}
                        /> :
                        null
                    }
                    {deleteVisible ?
                        <DialogContainer
                            title='Delete Session'
                            id='delete-session-dialog'
                            visible={deleteVisible}
                            onHide={this.hideDeleteSession}
                            focusOnMount={false}
                            portal={true}
                            lastChild={true}
                            disableScrollLocking={true}
                            renderNode={document.body}
                        >
                            <p>Are you sure you want to delete session {singleSession.session}?</p>
                            <Button raised primary onClick={this.deleteSession}>Yes</Button>
                            <Button flat onClick={this.hideDeleteSession}>Cancel</Button>
                        </DialogContainer> :
                        null
                    }
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
            createSession,
            getSessions,
        }, 
        dispatch
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionsContainer));