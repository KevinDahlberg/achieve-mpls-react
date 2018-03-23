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
    addNewUser, 
    deleteUser, 
    updateUser, 
} from './queries';
import {
    fetchYearsIfNeeded,
    fetchSessionsIfNeeded,
    fetchUsersIfNeeded,
    fetchUsers,
} from '../../store';

import { usersOptions } from './constants';

import SingleUser from './Components/SingleUser';
import UsersTable from './Components/UsersTable';
import YearMenu from '../Components/YearMenu';

class Users extends Component {
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
            users: this.props.users,
            addVisible: false
        }
    }

    componentDidMount() {
        const { 
            currentYear, 
            fetchUsersIfNeeded, 
            fetchSessionsIfNeeded, 
            fetchYearsIfNeeded, 
        } = this.props;
        fetchUsersIfNeeded(currentYear)
        .then((res) => {
            if (res) {
                this.setState({ users: res });
            }
        })
        .then(() => {
            fetchSessionsIfNeeded(currentYear)
            .then(() => {
                fetchYearsIfNeeded()
                .then(() => {
                    this.setState({ fetching: false });
                })
            })
        })
    }

    onSearchChange = (e) => {
        this.setState({ search: e });
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

    submitAddUser = (user) => {
        const { sessions, fetchUsers, currentYear } = this.props;
        const userToSend = this.prepareUserToSubmit(user, sessions);
        addNewUser(userToSend)
        .then(() => {
            fetchUsers(currentYear)
            .then((res) => {
                this.setState({ search: '', users: res });
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
                this.setState({ search: '', users: res });
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
                this.setState({ search: '', users: res });
            });
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);