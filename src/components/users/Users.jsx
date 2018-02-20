import React, { Component } from 'react'
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
    TextField,
} from 'react-md';

import { 
    fetchUsersIfNeeded, 
    addNewUser, 
    deleteUser,
    fetchUsers, 
    updateUser } from '../../data/usersStore';
import { fetchYearsIfNeeded } from '../../data/ticketStore';
import { fetchSessionsIfNeeded } from '../../data/sessionStore';
import { usersOptions } from '../../constants';

import SingleUser from './SingleUser';
import UsersTable from './UsersTable';
import YearMenu from '../tickets/YearMenu';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            user: {
                fname: '',
                lname: '',
                email: '',
                role: '',
                session_count: '',
                year: '',
            },
            addVisible: false
        }
    }

    componentDidMount() {
        const { currentYear, 
                fetchUsersIfNeeded, 
                fetchSessionsIfNeeded, 
                fetchYearsIfNeeded, 
                users } = this.props;
        fetchUsersIfNeeded(currentYear)
        .then((res) => {
            if (res) {
            this.fuse = new Fuse(res, usersOptions);
            } else {
                this.fuse = new Fuse (users, usersOptions);
            }
        })
        .then(() => {
            fetchSessionsIfNeeded(currentYear);
            fetchYearsIfNeeded();
        })
    }

    onSearchChange = (e) => {
        this.setState({ searchResults: this.fuse.search(e), search: e });
    }

    addUserHide = () => {
        this.setState({ addVisible: false });
    }

    addUserClick = () => {
        this.setState({ addVisible: true });
    }

    prepareUserToSubmit = (user, sessions) => {
        const userSession = sessions.filter((session) => session.session_count === user.session_count)
        if (user.session_id) { 
            user.session_id = userSession[0].id}
        const userYear = user.year.split(' ').slice(0,1);
        user.year = userYear[0];
        return user;
    }

    submitAddUser = (user) => {
        const { addNewUser, sessions, fetchUsers, currentYear } = this.props;
        const userToSend = this.prepareUserToSubmit(user, sessions);
        addNewUser(userToSend)
        .then((res) => {
            fetchUsers(currentYear)
            .then((res) => {
                this.fuse = new Fuse(res, usersOptions);
            })
        })
    }

    submitEditUser = (user) => {
        const { updateUser, fetchUsers, currentYear, sessions, users } = this.props;
        const userToSend = this.prepareUserToSubmit(user, sessions)
        const userId = users.filter((singleUser) => singleUser.email === user.email);
        userToSend.id = userId[0].id;
        updateUser(userToSend)
        .then((res) => {
            fetchUsers(currentYear)
            .then((res) => {
                this.fuse = new Fuse(res, usersOptions);
            })
        })
    }

    deleteUser = (user) => {
        const { deleteUser, fetchUsers, currentYear } = this.props;
        deleteUser(user)
        .then((res) => {
            fetchUsers(currentYear)
            .then((res) => {
                this.fuse = new Fuse(res, usersOptions);
            })
        })
    }

    render() {
        const { users, years, currentYear, sessions } = this.props;
        const { search, searchResults, addVisible, user } = this.state;
        return(
            <div className='tab-wrapper'>
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
                        sessions = {sessions}
                        users={search ? searchResults : users} 
                        usersClick={this.onUsersClick} 
                        submitEditUser={this.submitEditUser}
                        years={years}
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
        )
    }
}

const mapStateToProps = state => ({
    users: state.usersReducer.users,
    fetchingUsers: state.usersReducer.fetchingUsers,
    years: state.ticketReducer.years,
    currentYear: state.ticketReducer.currentYear,
    sessions: state.sessionReducer.sessions
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchUsersIfNeeded, 
            addNewUser, 
            deleteUser,
            fetchSessionsIfNeeded,
            fetchUsers,
            fetchYearsIfNeeded,
            updateUser,
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);