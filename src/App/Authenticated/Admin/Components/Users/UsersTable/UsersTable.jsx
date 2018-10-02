import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Fuse from 'fuse.js';
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

import { UsersTableRow } from './UsersTableRow';

export class UsersTable extends Component {
    static propTypes = {
        currentYear: PropTypes.number,
        deleteUser: PropTypes.func,
        search: PropTypes.string,
        sessions: PropTypes.array,
        slicedUsers: PropTypes.array,
        sortArray: PropTypes.func,
        submitEditUser: PropTypes.func,
        users: PropTypes.array,
        years: PropTypes.array,
    }

    constructor(props){
        super(props)
        this.state = {
            editVisible: false,
            deleteVisible: false,
            user: {},
            ascending: {
                fname: true,
                email: true,
                role: true,
                session_count: true,
                status: true,
            },
        }
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

    handlePagination = (start, rowsPerPage) => {
        this.props.onPagination(start, rowsPerPage);
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

    resetPW = () => {
        this.props.resetPW(this.state.user);
        this.setState({ user: {}, resetVisible: false });
    }
    
    deleteUser = (user) => {
        this.props.deleteUser(user);
    }

    editUserClick = (user) => {
        this.props.onUserClick(user);
    }

    submitUser = (user) => {
        const { submitEditUser } = this.props;
        submitEditUser(user);
    }

    sortArray = (key, ascending) => {
        this.props.sortArray(key, !ascending);
        this.setAscending(key);
    }

    viewUser = (user) => {
        this.props.onUserClick(user);
    }


    render() {
        const { users, slicedUsers } = this.props;
        const { ascending } = this.state;
        return (
            <Paper zDepth={2} className='table-wrapper'>
                <DataTable plain baseId={'users-table'}>
                    <TableHeader>
                        <TableRow>
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
                            <TableColumn>Remove</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {slicedUsers.map((user, idx) => (
                            <UsersTableRow
                                user={user}
                                key={idx}
                                deleteUser={this.deleteUser}
                                editUser={this.editUserClick}
                                resetPW={this.resetPWClick}
                                viewUser={this.viewUser}
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
        )
    }
}