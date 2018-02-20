import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'; 
import {
    Button,
} from 'react-md';

import * as logo from '../assets/achievempls-logo-white.png';

import { logout } from '../data/authStore';


import Tickets from '../components/tickets/Tickets';
import Users from '../components/users/Users';
import Sessions from '../components/sessions/Sessions';
import Forms from '../components/forms/Forms';
import Events from '../components/events/Events';

class Admin extends Component {
    
    logout = () => {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <header className='admin-header'>
                    <img src={logo} className='admin-logo' alt='achieve mpls logo' />
                    <NavLink 
                        className='nav-item'
                        exact
                        to='/admin'>
                            View Tickets
                        </NavLink>
                    <NavLink 
                        className='nav-item' 
                        to='/admin/users'>
                            Manage Users
                        </NavLink>
                    <NavLink 
                        className='nav-item' 
                        to='/admin/forms'>
                            Ticket Forms
                        </NavLink>
                    <NavLink 
                        className='nav-item' 
                        to='/admin/sessions'>
                            Manage Sessions
                        </NavLink>
                    <Button flat onClick={this.logout} className='logout-button'>Logout</Button>
                </header>

                    <Route path='/admin/events/:id' component={Events} />
                    <Route exact path='/admin/sessions' component={Sessions} />
                    <Route path='/admin/users' component={Users} />
                    <Route path='/admin/forms' component={Forms} />
                    <Route exact path='/admin' component={Tickets} />
            </div>
        )
    }
}

const stateToProps = state => ({
    ticketsReceived: state.ticketReducer.ticketsReceived,
    usersReceived: state.usersReducer.usersReceived,
    formsReceived: state.formReducer.formsReceived,
})

const dispatchToProps = dispatch => {
    return bindActionCreators(
        { logout }, dispatch
    );
}

export default withRouter(connect(stateToProps, dispatchToProps)(Admin));