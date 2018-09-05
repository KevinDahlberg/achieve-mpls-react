import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Paper, TextField, } from 'react-md';
import Fuse from 'fuse.js';

import { addNewUser, deleteUser, updateUser, addNewYear } from './queries';
import {
    fetchSessionsIfNeeded,
    fetchUsersIfNeeded,
    fetchUsers,
} from '../../store';
import { sortArray } from '../../utils';
import { usersOptions } from './constants';

import { SingleUser } from './SingleUser';
import { UsersTable } from './UsersTable';
import { YearMenu } from '../../Shared-Components';
import { AddYear } from './AddYear/AddYear';

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addVisible: false,
            addYearVisible: false,
            editing: false,
            fetching: true,
            search: '',
            singleUser: '',
            slicedUsers: [],
            tableRows: 10,
            user: {
                fname: '',
                lname: '',
                email: '',
                role: '',
                session: '',
                year: '',
            },
            users: [],
        }
    }

    componentWillMount() {
        const { 
            currentYear, 
            fetchUsersIfNeeded, 
            users,
        } = this.props;
        fetchUsersIfNeeded(currentYear)
        .then((res) => {
            if (res) {
                this.filterSearch(res, null);
            } else {
                this.filterSearch(users, null);
            }
            this.setState({ fetching: false });
        });
    };

    onSearchChange = (e) => {
        const { users } = this.props;
        this.filterSearch(users, e);
    }

    onPagination = (start, rowsPerPage) => {
        const { users } = this.state;
        this.setState({
            slicedUsers: users.slice(start, start + rowsPerPage),
            tableRows: rowsPerPage,
            fetching: false,
        })
    }

    onUserClick = (user) => {
        console.log(user);
        this.setState({ user, addVisible: true, editing: true })
    }

    onYearChange = (year) => {
        const { tableRows } = this.state;
        const { fetchUsers, years } = this.props;
        const selectedYear = years.filter(yr => yr.yearRange === year)[0];
        fetchUsers(parseFloat(selectedYear.year))
        .then((res) => {
            this.filterSearch(res, null);
            this.onPagination(0, tableRows)
        })
    }

    addUserClick = () => {
        this.setState({ addVisible: true, editing: false });
    }

    addUserHide = () => {
        this.setState({ addVisible: false });
    }

    addYearPopup = () => {
        this.setState({ addYearVisible: true });
    }

    addYearHide = () => {
        this.setState({ addYearVisible: false });
    }

    createNewYear = (nextYear) => {
        nextYear.yearRange = `${nextYear.year} - ${parseFloat(nextYear.year) + 1}`;
        addNewYear(nextYear);
    }

    deleteUser = (user) => {
        const { fetchUsers, currentYear } = this.props;
        this.setState({ search: '' });
        deleteUser(user)
        .then(() => {
            fetchUsers(currentYear)
            .then((res) => {
                this.filterSearch(res, null);            
            });
        })
    }

    filterSearch = (users, search) => {
        const { tableRows } = this.state;
        if (search) {
            const usersFused = new Fuse(users, usersOptions);
            const searchResults = usersFused.search(search);
            this.setState({ users: searchResults, search: search });
            this.onPagination(0, tableRows);
        } else {
            this.setState({ users: users, search: '' });
            this.onPagination(0, tableRows);
        }
    }

    prepareUserToSubmit = (user, sessions) => {
        const userSession = sessions.filter((session) => session.session_count === user.session_count)
        user.session_id = userSession[0].id;
        const userYear = user.year.split(' ').slice(0,1);
        user.year = userYear[0];
        return user;
    }

    sortUsers = (key, ascending) => {
        const { users, search } = this.state;
        const sortedUsers = sortArray(users, key, ascending);
        search.length === 0 ?
            this.filterSearch(sortedUsers, null) :
            this.filterSearch(sortedUsers, search);
    }

    submitAddUser = (user) => {
        const { sessions, fetchUsers, currentYear } = this.props;
        const userToSend = this.prepareUserToSubmit(user, sessions);
        addNewUser(userToSend)
        .then(() => {
            fetchUsers(currentYear)
            .then((res) => {
                this.filterSearch(res, null);
            })
        })
    }

    submitEditUser = (user) => {
        const { fetchUsers, currentYear, sessions, users } = this.props;
        this.setState({ search: '' });
        const userToSend = this.prepareUserToSubmit(user, sessions)
        const userId = users.filter((singleUser) => singleUser.email === user.email);
        userToSend.id = userId[0].id;
        updateUser(userToSend)
        .then(() => {
            fetchUsers(currentYear)
            .then((res) => {
                this.filterSearch(res, null);            
            })
        })
    }

    render() {
        const { years, currentYear, sessions } = this.props;
        const { search, addVisible, editing, slicedUsers, user, users, fetching, addYearVisible } = this.state;
        return( 
            <div className='tab-wrapper'>
                {fetching ? null :
                    <div>
                        <div className='tab-title'>
                            <h2>Users</h2>
                            <YearMenu 
                                years={years}
                                currentYear={currentYear}
                                onYearChange={this.onYearChange}
                            />
                        </div>
                        <div className='tab-items'>
                            <TextField
                                id='search-field'
                                label='Search...'
                                value={search}
                                onChange={this.onSearchChange}
                                size={20}
                                fullWidth={false}
                            />
                            <Paper
                                zDepth={2}
                                className='add-wrapper'
                            >
                                <span className='add-text'>Add User</span>
                                <Button floating primary className='add-button' onClick={this.addUserClick}>add</Button>
                            </Paper>
                            <Paper
                                zDepth={2}
                                className='add-wrapper'
                            >
                                <span className="add-text">Add Year</span>
                                <Button floating primary className="add-button" onClick={this.addYearPopup}>add</Button>
                            </Paper>
                        </div>
                        <div className='table-container'>
                            <UsersTable 
                                deleteUser = {this.deleteUser}
                                onPagination={this.onPagination}
                                onUserClick={this.onUserClick}
                                sessions = {sessions}
                                slicedUsers={slicedUsers}
                                sortArray={this.sortUsers}
                                submitEditUser={this.submitEditUser}
                                users={users}
                                userClick={this.onUserClick}
                            />
                        </div>
                        {user ?
                            <SingleUser
                                deleteUser={this.deleteUser}
                                editing={editing}
                                hide={this.addUserHide}
                                sessions={sessions}
                                submitUser={this.submitAddUser}
                                user={user}
                                visible={addVisible}
                                years={years}
                            /> : null
                        }
                            <AddYear
                                years={years}
                                hide={this.addYearHide}
                                visible={addYearVisible}
                                createNewYear={this.createNewYear}
                            />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.adminReducer.users,
    fetchingUsers: state.adminReducer.fetchingUsers,
    years: state.adminReducer.years,
    currentYear: state.adminReducer.currentYear,
    sessions: state.adminReducer.sessions
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchUsersIfNeeded, 
            fetchSessionsIfNeeded,
            fetchUsers,
        }, 
        dispatch
    );
}

export const Users = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);