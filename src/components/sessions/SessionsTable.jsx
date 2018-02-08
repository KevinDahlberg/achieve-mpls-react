import React, { Component } from 'react'
import {
    Button,
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

export default class SessionsTable extends Component {
    render() {
        const { sessions } = this.props;
        return (
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
                            <TableRow key={idx}>
                                <TableColumn>{session.session_count}</TableColumn>
                                <TableColumn>{session.grade}</TableColumn>
                                <TableColumn>{session.facilitator}</TableColumn>
                                <TableColumn>{session.day}</TableColumn>
                                <TableColumn>{session.start_time}</TableColumn>
                                <TableColumn>{session.school}</TableColumn>
                                <TableColumn><Button raised primary>Events</Button></TableColumn>
                                <TableColumn><Button icon>create</Button></TableColumn>
                                <TableColumn><Button icon>delete</Button></TableColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            </Paper>
        )
    }
}