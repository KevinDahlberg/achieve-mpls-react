import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
    TextField,
} from 'react-md';
import Fuse from 'fuse.js';

import {  
    addNewUser, 
    deleteUser, 
    updateUser, 
    resetPW,
} from './queries';
import {
    fetchYearsIfNeeded,
    fetchSessionsIfNeeded,
    fetchUsersIfNeeded,
    fetchUsers,
} from '../../store';
import { sortArray } from '../../utils';
import { usersOptions } from './constants';

import { SingleUser } from './SingleUser';
import { UsersTable } from './UsersTable';
import { YearMenu } from '../../Shared-Components';

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true,
            search: '',
            user: {
                fname: '',
                lname: '',
                email: '',
                role: '',
                session_count: '',
                year: '',
            },
            users: [],
            addVisible: false
        }
    }

    componentWillMount() {
        const { 
            currentYear, 
            fetchUsersIfNeeded, 
            fetchSessionsIfNeeded, 
            fetchYearsIfNeeded,
            users,
        } = this.props;
        fetchUsersIfNeeded(currentYear)
        .then((res) => {
            if (res) {
                this.filterSearch(res, null);
            } else {
                this.filterSearch(users, null);
            }
        })
        .then(() => {
            fetchSessionsIfNeeded(currentYear)
            .then(() => {
                fetchYearsIfNeeded()
                .then(() => {
                    this.setState({ fetching: false });
                });
            });
        });
    };

    onSearchChange = (e) => {
        const { users } = this.props;
        this.filterSearch(users, e);
    }

    filterSearch = (users, search) => {
        if (search) {
            const usersFused = new Fuse(users, usersOptions);
            const searchResults = usersFused.search(search);
            this.setState({ users: searchResults, search: search });
        } else {
            this.setState({ users: users, search: search });
        }
    }

    addUserHide = () => {
        this.setState({ addVisible: false });
    }

    addUserClick = () => {
        this.setState({ addVisible: true });
    }

    prepareUserToSubmit = (user, sessions) => {
        const userSession = sessions.filter((session) => session.session_count === user.session_count)
        user.session_id = userSession[0].id;
        const userYear = user.year.split(' ').slice(0,1);
        user.year = userYear[0];
        return user;
    }

    resetPW = (user) => {
        console.log(user);
        resetPW(user)
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

    sortUsers = (key, ascending) => {
        const { users } = this.props;
        const { search } = this.state;
        const sortedUsers = sortArray(users, key, ascending);
        search.length === 0 ?
            this.filterSearch(sortedUsers, null) :
            this.filterSearch(sortedUsers, search);
    }

    render() {
        const { years, currentYear, sessions } = this.props;
        const { search, addVisible, user, users, fetching } = this.state;
        return(
            
            <div className='tab-wrapper'>
                {fetching ? null :
                    <div>
                        <div className='tab-title'>
                            <h2>Users</h2>
                            <YearMenu 
                                years={years}
                                currentYear={currentYear}
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
                        </div>
                        <div className='table-container'>
                            {users.length === 0 ? null :
                            <UsersTable 
                                deleteUser = {this.deleteUser}
                                search = {search}
                                sessions = {sessions}
                                users={users} 
                                usersClick={this.onUsersClick} 
                                submitEditUser={this.submitEditUser}
                                years={years}
                                sortArray={this.sortUsers}
                                resetPW={this.resetPW}
                            />}
                        </div>
                            <SingleUser
                                hide={this.addUserHide}
                                user={user}
                                visible={addVisible}
                                submitUser={this.submitAddUser}
                                sessions={sessions}
                                years={years}
                                type='Add'
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
            fetchYearsIfNeeded,
        }, 
        dispatch
    );
}

export const Users = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);