import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkLogin } from './store/operations';

const Authorization = (allowedRoles) => (WrappedComponent) => {
    class WithAuthorization extends Component {

        render() {
            const { auth } = this.props;
            if (auth.isAuthenticating) {
                return null
            } else {
                if (auth.isAuthenticated && allowedRoles.includes(auth.user.role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return <Redirect to='/login' />
                }
            }
        }
    }

    const mapStateToProps = state => {
        console.log('state', state);
        return ({
            auth: state.auth,
        })
    }

    const mapDispatchToProps = dispatch => {
        return bindActionCreators(
            { checkLogin }, dispatch
        )
    }

    return connect (mapStateToProps, mapDispatchToProps)(WithAuthorization);
}

export default Authorization;
