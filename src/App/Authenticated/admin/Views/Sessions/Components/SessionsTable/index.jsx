import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import {
    Button,
    DataTable,
    DialogContainer,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import SessionsTableRow from './SessionsTableRow';
import SingleSession from './SingleSession';

class SessionsTable extends Component {
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
        this.setState({ editVisible: true, session: session });
    }

    deleteSessionDial = (session) => {
        this.setState({ deleteVisible: true, session: session });
    }

    deleteSession = () => {
        const { deleteSession } = this.props;
        const { session } = this.state;
        deleteSession(session);
        this.setState({ deleteVisible: false, session: {} });
    }

    submitSession = (session) => {
        this.setState({ editVisible: false, session: session });
        this.props.submitSession(session);
    }

    viewEvents = (session) => {
        const { history } = this.props;
        const id = session.session_count;
        history.push('/admin/events/' + id);
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
                                <TableColumn>Edit</TableColumn>
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
                                    deleteSessionDial={this.deleteSessionDial}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
                {editVisible ?
                    <SingleSession
                        session={session}
                        submitSession={this.submitSession}
                        visible={editVisible}
                        hide={this.editHide}
                        type={'Edit'}
                        years={years}
                    /> :
                    null
                }
                {deleteVisible ?
                    <DialogContainer
                        title='Delete Session'
                        id='delete-session-dialog'
                        visible={deleteVisible}
                        onHide={this.deleteHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>Are you suer you want to delete session {session.session_count}?</p>
                        <Button raised primary onClick={this.deleteSession}>Yes</Button>
                        <Button flat onClick={this.deleteHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                    }
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

export default withRouter(SessionsTable);