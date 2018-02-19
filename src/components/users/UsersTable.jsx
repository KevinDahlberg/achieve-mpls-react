import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
    Button,
    DataTable,
    DialogContainer,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
    TablePagination,
} from 'react-md';

import SingleUser from './SingleUser';
import UsersTableRow from './UsersTableRow';

export default class UsersTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            resetVisible: false,
            editVisible: false,
            deleteVisible: false,
            user: {},
            users: this.props.users,
            slicedUsers: this.props.users.slice(0,10),
            ascendingName: true,
            ascendingEmail: true,
            ascendingRole: true,
            ascendingSession: true,
            ascendingStatus: true,
            rows: 10,
        }
    }

    componentWillMount() {
        const { ascendingName } = this.state;
        const sortedUsersByName = this.sortUsers('fname', ascendingName);
        console.log(sortedUsersByName);
        this.setState({ users: sortedUsersByName, slicedUsers: sortedUsersByName.slice(0,10) })
    }

    sortUsers = (key, ascending) => {
        const { users } = this.state;
        let sortedUsers = sortBy(users, key)
        if (!ascending) {
            sortedUsers.reverse();
        }
        return sortedUsers
    }

    sortByName = () => {
        const { rows } = this.state;
        const ascendingName = !this.state.ascendingName;
        const sorted = this.sortUsers('fname', ascendingName);
        this.setState({ 
            ascendingName,
            ascendingEmail: true,
            ascendingRole: true,
            ascendingSession: true,
            ascendingStatus: true,
            users: sorted,
            slicedUsers: sorted.slice(0,rows)
        });
    }

    sortByEmail = () => {
        const { rows } = this.state;
        const ascendingEmail = !this.state.ascendingEmail;
        const sorted = this.sortUsers('email', ascendingEmail);
        this.setState({ 
            ascendingEmail, 
            ascendingName: true,
            ascendingRole: true,
            ascendingSession: true,
            ascendingStatus: true,
            users: sorted, 
            slicedUsers: sorted.slice(0,rows)
        });
    }

    sortByRole = () => {
        const { rows } = this.state;
        const ascendingRole = !this.state.ascendingRole;
        const sorted = this.sortUsers('role', ascendingRole);
        this.setState({
            ascendingRole,
            ascendingEmail: true,
            ascendingName: true,
            ascendingSession: true,
            ascendingStatus: true,
            users: sorted,
            slicedUsers: sorted.slice(0,rows),
        });
    }

    sortBySession = () => {
        const { rows, users } = this.state;
        const ascendingSession = !this.state.ascendingSession;
        let sorted = sortBy(users, function(o) {
            return Number(o.session_count);
        });
        if (!ascendingSession) {
            sorted.reverse();
        }
        this.setState({
            ascendingSession,
            ascendingEmail: true,
            ascendingName: true,
            ascendingRole: true,
            ascendingStatus: true,
            users: sorted,
            slicedUsers: sorted.slice(0,rows),
        })
    }

    sortByStatus = () => {
        const { rows } = this.state;
        const ascendingStatus = !this.state.ascendingStatus;
        const sorted = this.sortUsers('status', ascendingStatus);
        this.setState({
            ascendingStatus,
            ascendingEmail: true,
            ascendingName: true,
            ascendingRole: true,
            ascendingSession: true,
            users: sorted,
            slicedUsers: sorted.slice(0,rows),
        })
    }

    resetHide = () => {
        this.setState({ resetVisible: false });
    }

    editHide = () => {
        this.setState({ editVisible: false });
    }

    deleteHide = () => {
        this.setState({ deleteVisible: false });
    }

    resetPWClick = (user) => {
        console.log('reset pw clicked ', user);
        this.setState({ user: user, resetVisible: true });
    }
    
    deleteUser = () => {
        const { deleteUser } = this.props;
        const { user } = this.state;
        deleteUser(user);
        this.setState({ user: {} })
        console.log('delete user clicked,', this.state.user);
        this.deleteHide();
    }

    editUserClick = (user) => {
        this.setState({ user: user, editVisible: true });
    }

    deleteUserClick = (user) => {
        this.setState({ user: user, deleteVisible: true });
    }

    submitUser = (user) => {
        const { submitEditUser } = this.props;
        submitEditUser(user);
    }

    handlePagination = (start, rowsPerPage) => {
        const { users } = this.state;
        this.setState({ slicedUsers: users.slice(start, start + rowsPerPage), rows: rowsPerPage });
    }

    render() {
        const { users, sessions, years } = this.props;
        const { 
                user, 
                resetVisible, 
                editVisible, 
                deleteVisible, 
                slicedUsers, 
                ascendingName, 
                ascendingEmail,
                ascendingRole,
                ascendingSession,
                ascendingStatus, 
            } = this.state;
        return (
            <div>
                <Paper
                    zDepth={2}
                    className='table-wrapper'
                >
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Registration</TableColumn>
                                <TableColumn 
                                    sorted={ascendingName} 
                                    onClick={this.sortByName}
                                    role="button"
                                >
                                    Name
                                </TableColumn>
                                <TableColumn
                                    sorted={ascendingEmail}
                                    onClick={this.sortByEmail}
                                    role="button"
                                >
                                    Email
                                </TableColumn>
                                <TableColumn
                                    sorted={ascendingRole}
                                    onClick={this.sortByRole}
                                    role="button"
                                >
                                    Role
                                </TableColumn>
                                <TableColumn
                                    sorted={ascendingSession}
                                    onClick={this.sortBySession}
                                    role="button"
                                >
                                    Session
                                </TableColumn>
                                <TableColumn
                                    sorted={ascendingStatus}
                                    onClick={this.sortByStatus}
                                    role="button"
                                >
                                    Status
                                </TableColumn>
                                <TableColumn>Edit</TableColumn>
                                <TableColumn>Remove</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {slicedUsers.map((user, idx) => (
                                <UsersTableRow
                                    user={user}
                                    key={idx}
                                    deleteUser={this.deleteUserClick}
                                    editUser={this.editUserClick}
                                    resetPW={this.resetPWClick}
                                />
                            ))}
                        </TableBody>
                        <TablePagination
                            rows={users.length}
                            rowsPerPageLabel={'Items Per Page'}
                            onPagination={this.handlePagination}
                        />
                    </DataTable>
                </Paper>
                {resetVisible ? 
                    <DialogContainer
                        title="Register User"
                        id="register-user-dialog"
                        visible={resetVisible}
                        onHide={this.resetHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>You are inviting {user.fname} {user.lname} to join AchiveMpls.</p>
                        <Button raised primary onClick={this.resetPW}>Yes</Button>
                        <Button flat onClick={this.resetHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                }
                {editVisible ?
                    <SingleUser
                        user={user}
                        visible={editVisible}
                        hide={this.editHide}
                        sessions={sessions}
                        submitUser={this.submitUser}
                        years={years}
                        type='Edit'
                    /> :
                    null
                }
                {deleteVisible ?
                    <DialogContainer
                        title='Delete User'
                        id="delete-user-dialog"
                        visible={deleteVisible}
                        onHide={this.deleteHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>Are you sure you want to delete {user.fname} {user.lname}?</p>
                        <Button raised primary onClick={this.deleteUser}>Yes</Button>
                        <Button flat onClick={this.deleteHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                }
            </div>
        )
    }
}

UsersTable.propTypes = {
    deleteUser: PropTypes.function,
    sessions: PropTypes.array,
    submitEditUser: PropTypes.function,
    users: PropTypes.array,
    years: PropTypes.array,
}