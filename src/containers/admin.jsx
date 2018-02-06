import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import * as logo from '../assets/achievempls-logo-white.png';

import ViewTickets from '../components/viewTickets/viewTickets';

export default class Admin extends Component {
    render() {
        return (
            <div>
                <header className='admin-header'>
                    <img src={logo} alt='achieve mpls logo' />
                </header>
                <Switch>
                    <Route exact path='/home' component={ViewTickets} />
                    <Route path='/home/tickets' component={ViewTickets} />
                </Switch>
            </div>
        )
    }
}