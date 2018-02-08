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

export default class UsersTable extends Component {

    usersClick = (user, e) => {
        this.props.usersClick(user);
    }

    render() {
        const { users } = this.props;
        return (
            <Paper
                zDepth={2}
                className='table-wrapper'
            >
                <DataTable plain>
                    <TableHeader>
                        <TableRow>
                            <TableColumn>Registration</TableColumn>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Role</TableColumn>
                            <TableColumn>Session</TableColumn>
                            <TableColumn>Status</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, idx) => (
                            <TableRow key={idx} onClick={(e) => this.usersClick(user, e)}>
                                <TableColumn><Button primary raised>Reset PW</Button></TableColumn>
                                <TableColumn>{user.fname} {user.lname}</TableColumn>
                                <TableColumn>{user.email}</TableColumn>
                                <TableColumn>{user.role}</TableColumn>
                                <TableColumn>{user.session_count}</TableColumn>
                                <TableColumn>{user.status}</TableColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            </Paper>
        )
    }
}