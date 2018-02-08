import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import {
    Button,
    TabsContainer,
    Tabs,
    Tab,
} from 'react-md';

import * as logo from '../assets/achievempls-logo-white.png';

import { logout } from '../data/authStore';

import Tickets from '../components/tickets/Tickets';
import Users from '../components/users/Users';
import Sessions from '../components/sessions/Sessions';
import Forms from '../components/forms/Forms';

class Admin extends Component {

    logout = () => {
        this.props.logout();
    }
    render() {
        return (
            <div>
                <header className='admin-header'>
                    <img src={logo} className='admin-logo' alt='achieve mpls logo' />
                    <Button flat onClick={this.logout} className='logout-button'>Logout</Button>
                </header>
                <TabsContainer panelClassName='md-grid' colored>
                    <Tabs 
                        tabId='admin-tabs'
                    >
                        <Tab label='View Tickets'>
                            <Tickets />
                        </Tab>
                        <Tab label='Manage Users'>
                            <Users />
                        </Tab>
                        <Tab label='Ticket Forms'>
                            <Forms />
                        </Tab>
                        <Tab label='Manage Sessions'>
                            <Sessions />
                        </Tab>
                    </Tabs>
                </TabsContainer>
            </div>
        )
    }
}

const dispatchToProps = dispatch => {
    return bindActionCreators(
        { logout }, dispatch
    );
}

export default connect(null, dispatchToProps)(Admin);