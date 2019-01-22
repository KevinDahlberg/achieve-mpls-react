import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md'

export default class SessionsTableRow extends Component {
    viewEvents = () => {
        const { session, viewEvents } = this.props;
        viewEvents(session);
    }

    editSession = () => {
        const { session, editSession } = this.props;
        editSession(session);
    }

    deleteSession = (e) => {
        const { session, deleteSession } = this.props;
        e.stopPropagation();
        deleteSession(session);
    }

    render() {
        const { session, idx } = this.props;
        return (
            <TableRow key={idx} onClick={this.editSession}>
                <TableColumn>{session.session}</TableColumn>
                <TableColumn>{session.grade}</TableColumn>
                <TableColumn>{session.facilitator}</TableColumn>
                <TableColumn>{session.dayOfWeek}</TableColumn>
                <TableColumn>{session.startTime}</TableColumn>
                <TableColumn>{session.school}</TableColumn>
                <TableColumn><Button raised primary onClick={this.viewEvents}>Events</Button></TableColumn>
                <TableColumn><Button icon onClick={this.deleteSession}>delete</Button></TableColumn>
            </TableRow>
        )
    }
}

SessionsTableRow.propTypes = {
    deleteSessionDial: PropTypes.func,
    editSession: PropTypes.func,
    idx: PropTypes.number,
    session: PropTypes.object,
    viewEvents: PropTypes.func, 
}
