import React, { Component } from 'react'
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
    TextField,
} from 'react-md';

import { getUsers } from '../../data/usersStore';
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
            singleUser: {
                fname: '',
                lname: '',
                email: '',
                role: '',
                session_count: '',
                year: '',
            },
            editVisible: false
        }
    }

    componentDidMount() {
        const { getUsers } = this.props;
        getUsers()
        .then((res) => {
            this.fuse = new Fuse(res, usersOptions);
            console.log(res)
        })
    }

    onSearchChange = (e) => {
        this.setState({ searchResults: this.fuse.search(e), search: e });
    }

    onEditDialogHide = () => {
        this.setState({ editVisible: false });
    }

    onUsersClick = (user) => {
        console.log(user);
        this.setState({ singleUser: user, editVisible: true });
    }

    render() {
        const { users, years, currentYear } = this.props;
        const { search, searchResults, singleUser, editVisible } = this.state;
        console.log(singleUser);
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
                        <Button floating primary className='add-button'>add</Button>
                    </Paper>
                </div>
                <div className='table-container'>
                    {users.length === 0 ? null :
                    <UsersTable 
                        users={search ? searchResults : users} 
                        usersClick={this.onUsersClick} 
                    />}
                </div>
                    <SingleUser
                        user={singleUser}
                        visible={editVisible}
                        onDialogHide={this.onEditDialogHide}
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
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { getUsers }, dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);