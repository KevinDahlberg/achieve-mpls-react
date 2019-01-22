import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import SessionsTableRow from '../SessionsTableRow';

export default class SessionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editVisible: false,
            eventsVisible: false,
            deleteVisible: false,
            session: {}
        }
    }

    editHide = () => {
        this.setState({ editVisible: false });
    }

    eventsHide = () => {
        this.setState({ eventsVisible: false });
    }

    deleteHide = () => {
        this.setState({ deleteVisible: false });
    }

    editSession = (session) => {
        const { editSession } = this.props
        editSession(session);
    }

    deleteSession = (session) => {
        const { deleteSession } = this.props;
        deleteSession(session);
    }

    submitSession = (session) => {
        this.setState({ editVisible: false, session: session });
        this.props.submitSession(session);
    }

    viewEvents = (session) => {
        const id = session.id;
        this.props.viewEvent(id)
    }

    render() {
        const { sessions, years } = this.props;
        const { editVisible, deleteVisible, session } = this.state;
        return (
            <div>
                <Paper
                    zDepth={2}
                    className='table-wrapper'
                >
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Session</TableColumn>
                                <TableColumn>Grade</TableColumn>
                                <TableColumn>Facilitator</TableColumn>
                                <TableColumn>Day</TableColumn>
                                <TableColumn>Start Time</TableColumn>
                                <TableColumn>School</TableColumn>
                                <TableColumn>View Events</TableColumn>
                                <TableColumn>Delete</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.map((session, idx) => (
                                <SessionsTableRow
                                    key={idx}
                                    idx={idx}
                                    session={session}
                                    viewEvents={this.viewEvents}
                                    editSession={this.editSession}
                                    deleteSession={this.deleteSession}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
            </div>
        )
    }
}

SessionsTable.propTypes = {
    deleteSession: PropTypes.func,
    formArray: PropTypes.array,
    sessions: PropTypes.array,
    submitSession: PropTypes.func,
    years: PropTypes.array,
}