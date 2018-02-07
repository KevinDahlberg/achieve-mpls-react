import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkSession } from './data/authStore';

const Authorization = (allowedRoles) => (WrappedComponent) => {
    class WithAuthorization extends Component {

        render() {
            const { authenticating, isAuthenticated, role } = this.props;
            if (authenticating) {
                return null
            } else {
                if (isAuthenticated && allowedRoles.includes(role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return <Redirect to='/login' />
                }
            }
        }
    }

    const mapStateToProps = ({ authReducer }) => ({
        authenticating: authReducer.authenticating,
        isAuthenticated: authReducer.isAuthenticated,
        role: authReducer.userRole
    })

    const mapDispatchToProps = dispatch => {
        return bindActionCreators(
            { checkSession }, dispatch
        )
    }

    return connect (mapStateToProps, mapDispatchToProps)(WithAuthorization);
}

export default Authorization;
