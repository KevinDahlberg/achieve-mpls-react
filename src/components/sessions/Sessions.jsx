import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';
import { getSessions } from '../../data/sessionStore';
import { newSession } from '../../constants';

import SessionsTable from './SessionsTable';
import SingleSession from './SingleSession';

class ViewSessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleSession: newSession,
            addVisible: false,
        }
    }

    componentDidMount() {
        const { currentYear, getSessions } = this.props;
        getSessions(currentYear)
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
        this.setState({ addVisible: false });
        console.log(session);
    }

    render() {
        const { sessions, formArray } = this.props;
        const { addVisible, singleSession } = this.state;
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
                        sessions={sessions}
                    />
                    }
                </div>
                    <SingleSession
                        hide={this.addSessionHide}
                        session={singleSession}
                        visible={addVisible}
                        submitSession={this.submitSession}
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
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { getSessions }, dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewSessions);