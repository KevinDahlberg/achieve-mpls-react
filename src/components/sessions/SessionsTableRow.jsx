import React, { Component } from 'react';
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

    deleteSession = () => {
        const { session, deleteSession } = this.props;
        deleteSession(session);
    }

    render() {
        const { session, idx } = this.props;
        return (
            <TableRow key={idx}>
                <TableColumn>{session.session_count}</TableColumn>
                <TableColumn>{session.grade}</TableColumn>
                <TableColumn>{session.facilitator}</TableColumn>
                <TableColumn>{session.day}</TableColumn>
                <TableColumn>{session.start_time}</TableColumn>
                <TableColumn>{session.school}</TableColumn>
                <TableColumn><Button raised primary onClick={this.viewEvents}>Events</Button></TableColumn>
                <TableColumn><Button icon onClick={this.editSession}>create</Button></TableColumn>
                <TableColumn><Button icon onClick={this.deleteSession}>delete</Button></TableColumn>
            </TableRow>
        )
    }
}