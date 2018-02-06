import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Admin from './admin'
import Coach from './coach'

class Home extends Component {

    render() {
        const { isAuthenticated, userRole } = this.props;
        console.log( isAuthenticated, userRole );
        if (isAuthenticated && userRole === 'coach') {
            return (
                <Coach {...this.props} />
            )
        } else if (isAuthenticated && userRole === 'admin') {
            return (
                <Admin {...this.props} />
            )
        } else {
            return (
                <Redirect to='/login' />
            )
        }
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.userReducer.isAuthenticated,
    userRole: state.userReducer.userRole,
})

export default connect(mapStateToProps, null)(Home);
