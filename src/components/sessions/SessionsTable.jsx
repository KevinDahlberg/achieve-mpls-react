import React, { Component } from 'react'
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
import Events from './events/Events';

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
        this.setState({ editVisible: true, session: session });
    }

    deleteSession = (session) => {
        this.setState({ deleteVisible: true, session: session });
    }

    showEvents = (session) => {
        this.setState({ eventsVisible: true, session: session });
    }

    render() {
        const { sessions } = this.props;
        const { editVisible, eventsVisible, deleteVisible, session } = this.state;
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
                                    deleteSession={this.deleteSession}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
                {eventsVisible ?
                    <Events /> :
                    null
                }
                {editVisible ?
                    <SingleSession
                        session={session}
                        visible={editVisible}
                        hide={this.editHide}
                        type={'Edit'}
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