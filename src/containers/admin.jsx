import React, { Component } from 'react';

import {
    TabsContainer,
    Tabs,
    Tab,
} from 'react-md';

import * as logo from '../assets/achievempls-logo-white.png';

import Tickets from '../components/tickets/tickets';
import ViewUsers from '../components/viewUsers/viewUsers';
import ViewSessions from '../components/viewSessions/viewSessions';
import ViewTemplates from '../components/viewTemplates/viewTemplates';

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
                            <ViewUsers />
                        </Tab>
                        <Tab label='Ticket Templates'>
                            <ViewTemplates />
                        </Tab>
                        <Tab label='Manage Sessions'>
                            <ViewSessions />
                        </Tab>
                    </Tabs>
                </TabsContainer>
            </div>
        )
    }
}