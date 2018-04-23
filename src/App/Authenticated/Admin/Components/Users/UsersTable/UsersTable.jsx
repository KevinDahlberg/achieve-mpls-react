import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Fuse from 'fuse.js';
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

import { usersOptions } from '../constants';

import { SingleUser } from '../SingleUser';
import { UsersTableRow } from './UsersTableRow';

export class UsersTable extends Component {
    static propTypes = {
        deleteUser: PropTypes.func,
        search: PropTypes.string,
        sessions: PropTypes.array,
        submitEditUser: PropTypes.func,
        users: PropTypes.array,
        years: PropTypes.array,
        resetPW: PropTypes.func,
    }

    constructor(props){
        super(props)
        this.state = {
            resetVisible: false,
            editVisible: false,
            deleteVisible: false,
            user: {},
            users: [],
            slicedUsers: [],
            ascending: {
                fname: true,
                email: true,
                role: true,
                session_count: true,
                status: true,
            },
            rows: 10,
        }
    }

    componentDidMount() {
        const { users } = this.props;
        //sets up search functionality
        this.fuse = new Fuse(users, usersOptions);
        this.setState({ users: users, slicedUsers: users.slice(0,10) });
    }

    componentWillReceiveProps(nextProps) {
        const { search, users } = nextProps;
        const { rows } = this.state;
        const sliceOfUsers = users.slice(0, rows);
        this.setState({ slicedUsers: sliceOfUsers });
    }

    // changes all items except the key of the selected item to true, sets
    // state with the currentKey as false.
    setAscending = (currentKey) => {
        const { ascending } = this.state;
        const currentKeyValue = ascending[currentKey];
        Object.keys(ascending).map(key => {
            ascending[key] = true;
        })
        const updatedAscending = { ...ascending, [currentKey]: !currentKeyValue }
        this.setState({ ascending: updatedAscending });
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
        this.setState({ user: user, resetVisible: true });
    }

    resetPW = () => {
        this.props.resetPW(this.state.user);
        this.setState({ user: {}, resetVisible: false });
    }
    
    deleteUser = () => {
        const { deleteUser } = this.props;
        const { user } = this.state;
        deleteUser(user);
        this.setState({ user: {} })
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

    sortArray = (key, ascending) => {
        this.props.sortArray(key, !ascending);
        this.setAscending(key);
    }

    render() {
        const { users, sessions, years } = this.props;
        const { user, ascending, slicedUsers, resetVisible, editVisible, deleteVisible } = this.state;
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
                                    sorted={ascending.fname} 
                                    onClick={(e) => this.sortArray('fname', ascending.fname)}
                                    role="button"
                                >
                                    Name
                                </TableColumn>
                                <TableColumn
                                    sorted={ascending.email}
                                    onClick={(e) => this.sortArray('email', ascending.email)}
                                    role="button"
                                >
                                    Email
                                </TableColumn>
                                <TableColumn
                                    sorted={ascending.role}
                                    onClick={(e) => this.sortArray('role', ascending.role)}
                                    role="button"
                                >
                                    Role
                                </TableColumn>
                                <TableColumn
                                    sorted={ascending.session}
                                    onClick={(e) => this.sortArray('session_count', ascending.session_count)}
                                    role="button"
                                >
                                    Session
                                </TableColumn>
                                <TableColumn
                                    sorted={ascending.status}
                                    onClick={(e) => this.sortArray('status', ascending.status)}
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