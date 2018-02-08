import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { Button } from 'react-md';

import * as logo from '../assets/achievempls-logo-white.png';

import { logout } from '../data/authStore';

class Coach extends Component {

    logout = () => {
        this.props.logout();
    }
    render() {
        return (
            <header className='coach-header'>
                <img src={logo} className='coach-logo' alt='achieve mpls logo' />
                <Button flat onClick={this.logout}>Logout</Button>
            </header>
        )
    }
}

const dispatchToProps = dispatch => bindActionCreators(
    { logout }, dispatch
);

export default connect(null, dispatchToProps)(Coach);