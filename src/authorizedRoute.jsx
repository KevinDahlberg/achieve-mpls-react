import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkSession } from './data/userStore';

const Authorization = (allowedRoles) => (WrappedComponent) => {
    class WithAuthorization extends Component {

        componentWillMount() {
            this.props.checkSession()
        }

        render() {
            const { isAuthenticated, role } = this.props;
            if (isAuthenticated && allowedRoles.includes(role)) {
                return <WrappedComponent {...this.props} />
            } else {
                return <Redirect to='/login' />
            }
        }
    }

    const mapStateToProps = ({ userReducer }) => ({
        authenticating: userReducer.authenticating,
        isAuthenticated: userReducer.isAuthenticated,
        role: userReducer.userRole
    })

    const mapDispatchToProps = dispatch => {
        return bindActionCreators(
            { checkSession }, dispatch
        )
    }

    return connect (mapStateToProps, mapDispatchToProps)(WithAuthorization);
}

export default Authorization;
