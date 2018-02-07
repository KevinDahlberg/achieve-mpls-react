import React, { Component } from 'react';

import {
    TabsContainer,
    Tabs,
    Tab,
} from 'react-md';

import * as logo from '../assets/achievempls-logo-white.png';

import Tickets from '../components/tickets/Tickets';
import Users from '../components/users/Users';
import Sessions from '../components/sessions/Sessions';
import Forms from '../components/forms/Forms';

export default class Admin extends Component {
    render() {
        return (
            <div>
                <header className='admin-header'>
                    <img src={logo} className='admin-logo' alt='achieve mpls logo' />
                </header>
                <TabsContainer panelClassName='md-grid' colored>
                    <Tabs 
                        tabId='admin-tabs'
                        centered
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