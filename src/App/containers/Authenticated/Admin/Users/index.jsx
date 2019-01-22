import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Paper, TextField, } from 'react-md';
import Fuse from 'fuse.js';

import { addNewUser, deleteUser, getUsers, updateUser, addNewYear, getSingleUser } from './store/operations';
import { sortArray } from '../../../../../utils/sorting';
import { usersOptions } from '../../../../../constants/fuse';

import SingleUser from './components/SingleUser';
import UsersTable from './components/UsersTable';
import YearMenu from '../../../../components/YearMenu';
import AddYear from './components/AddYear';

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addVisible: false,
            addYearVisible: false,
            editing: false,
            editVisible: false,
            fetching: true,
            search: '',
            singleUser: {
                email: '',
                fname: '',
                lname: '',
                years: [],
            },
            slicedUsers: [],
            tableRows: 10,
            users: [],
        }
    }

    componentWillMount() {
        // const { 
        //     currentYear, 
        //     users,
        // } = this.props;
        // getUsers(currentYear)
        // .then((res) => {
        //     if (res) {
        //         this.filterSearch(res, null);
        //     } else {
        //         this.filterSearch(users, null);
        //     }
        // })
        // .then(() => {
        //     fetchSessionsIfNeeded(currentYear)
        //     .then((res) => {
        //         const yearObj = { session: '', year: currentYear }
        //         this.setState({ fetching: false, singleUser: { ...this.state.singleUser, years: [yearObj] } });
        //     })
        // });
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
        this.setState({ addVisible: true, editing: false, user: {} });
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
        getSingleUser(user)
        .then((res) => {
            const userObj = {
                yearsId: user.id,
                userId: res.id,
                ...res
            }
            deleteUser(userObj)
            .then(() => {
                fetchUsers(currentYear)
                .then((res) => {
                    this.filterSearch(res, null);            
                });
            });
        });
    }

    editUserClick = (user) => {
        getSingleUser(user)
        .then((res) => {
            const userObj = {
                yearsId: user.id,
                userId: res.id,
                ...res
            }
            this.setState({ editVisible: true, editing: true, singleUser: userObj });
        })
        
    }

    editUserHide = () => {
        const { currentYear } = this.props;
        const yearObj = { session: '', year: currentYear }
        const singleUser = {
            email: '',
            fname: '',
            lname: '',
            years: [yearObj],
        }
        this.setState({ editVisible: false, singleUser });
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

    prepareUserToSubmit = (user) => {
        const fixedYear = user.years.map(yearObj => {
            yearObj.year = yearObj.year.split(' ').slice(0,1)[0];
            return yearObj;
        })
        user.years = fixedYear;
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
        const { fetchUsers, currentYear } = this.props;
        user = this.prepareUserToSubmit(user);
        addNewUser(user)
        .then(() => {
            fetchUsers(currentYear)
            .then((res) => {
                this.filterSearch(res, null);
            })
        })
    }

    submitEditUser = (user) => {
        const { fetchUsers, currentYear, users } = this.props;
        this.setState({ search: '' });
        const userToSend = this.prepareUserToSubmit(user)
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
        const { search, addVisible, editing, editVisible, slicedUsers, singleUser, users, fetching, addYearVisible } = this.state;
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
                                onUserClick={this.editUserClick}
                                sessions = {sessions}
                                slicedUsers={slicedUsers}
                                sortArray={this.sortUsers}
                                submitEditUser={this.submitEditUser}
                                users={users}
                                userClick={this.onUserClick}
                            />
                        </div>
                        {addVisible ?
                            <SingleUser
                                deleteUser={this.deleteUser}
                                editing={editing}
                                hide={this.addUserHide}
                                sessions={sessions}
                                submitUser={this.submitAddUser}
                                user={singleUser}
                                visible={addVisible}
                                years={years}
                            /> : null
                        }
                        {editVisible ?
                            <SingleUser
                                deleteUser={this.deleteUser}
                                editing={editing}
                                hide={this.editUserHide}
                                sessions={sessions}
                                submitUser={this.submitEditUser}
                                user={singleUser}
                                visible={editVisible}
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
            getUsers
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);