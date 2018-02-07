import React, { Component } from 'react'
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUsers } from '../../data/usersStore';
import { usersOptions } from '../../constants';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            singleUser: '',
            visible: false
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

    render() {
        const { users } = this.props;
        const { search, searchResults, singleUser, visible } = this.state;
        return(
            <div>
                <h2>Users</h2>
            </div>
        )
    }
}

const stateToProps = usersReducer => ({
    users: usersReducer.users,
})

const dispatchToProps = dispatch => {
    return bindActionCreators(
        { getUsers }, dispatch
    );
}

export default connect(stateToProps, dispatchToProps)(Users);