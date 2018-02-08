import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';
import { getSessions } from '../../data/sessionStore';

import SessionsTable from './SessionsTable';


class ViewSessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleSession: '',
            visible: false,
        }
    }

    componentDidMount() {
        const { currentYear, getSessions } = this.props;
        getSessions(currentYear)
        .then((res) => {
            console.log(res);
        })
    }

    render() {
        const { sessions } = this.props;
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
                        <Button floating primary className='add-button'>add</Button>
                    </Paper>
                </div>
                <div className="table-container">
                    {sessions.length === 0 ? null :
                    <SessionsTable
                        sessions={sessions}
                    />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sessions: state.sessionReducer.sessions,
    currentYear: state.ticketReducer.currentYear,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { getSessions }, dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewSessions);