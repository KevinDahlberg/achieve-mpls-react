import React, { Component } from 'react'
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
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
        const { users } = this.props;
        const { search, searchResults, singleUser, editVisible } = this.state;
        console.log(singleUser);
        return(
            <div className='users-tab'>
                <h2>Users</h2>
                <div>
                    <YearMenu />
                    <TextField
                        id='search-field'
                        label='Search...'
                        value={search}
                        onChange={this.onSearchChange}
                        className="md-cell md-cell--bottom"
                    />
                </div>
                <div className='users-table'>
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
    fetchingUsers: state.usersReducer.fetchingUsers
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { getUsers }, dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);