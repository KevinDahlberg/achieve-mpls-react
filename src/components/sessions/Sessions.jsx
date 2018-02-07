import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
            <div>
                <div>
                    <h2>Manage Sessions</h2>
                </div>
                <div className="sessions-table">
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