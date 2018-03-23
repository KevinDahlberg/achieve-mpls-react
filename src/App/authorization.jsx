import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkSession } from './store';

const Authorization = (allowedRoles) => (WrappedComponent) => {
    class WithAuthorization extends Component {

        render() {
            const { authenticating, isAuthenticated, role } = this.props;
            console.log('hitting auth', role, authenticating, isAuthenticated);
            if (authenticating) {
                console.log('returning null in auth');
                return null
            } else {
                if (isAuthenticated && allowedRoles.includes(role)) {
                    console.log('in if statement');
                    return <WrappedComponent {...this.props} />
                } else {
                    return <Redirect to='/login' />
                }
            }
        }
    }

    const mapStateToProps = state => ({
        authenticating: state.authReducer.authenticating,
        isAuthenticated: state.authReducer.isAuthenticated,
        role: state.authReducer.userRole
    })

    const mapDispatchToProps = dispatch => {
        return bindActionCreators(
            { checkSession }, dispatch
        )
    }

    return connect (mapStateToProps, mapDispatchToProps)(WithAuthorization);
}

export default Authorization;
