import React, { Component } from 'react';

import * as logo from '../assets/achievempls-logo-white.png';

export default class Admin extends Component {
    render() {
        return (
            <header className='admin-header'>
                <img src={logo} alt='achieve mpls logo' />
            </header>
        )
    }
}