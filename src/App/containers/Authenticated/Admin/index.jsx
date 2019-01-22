import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'; 
import {
    Button,
} from 'react-md';

import * as logo from '../../../assets/achievempls-logo-white.png';

import { logout } from '../../Auth/store/operations';
import { getYears } from './Years/store/operations';

import Events from './Events';
import Sessions from './Sessions';
import Tickets from './Tickets';
import Users from './Users';
import Forms from './Forms';

class Admin extends Component {
    
    componentWillMount() {
        const { years, getYears } = this.props;
        if (years.years.length <= 0) {
            getYears();
        }
    }

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

const mapStateToProps = state => ({
    years: state.years
})

const dispatchToProps = dispatch => {
    return bindActionCreators(
        { logout, getYears  }, dispatch
    );
}

export default connect(mapStateToProps, dispatchToProps)(Admin);