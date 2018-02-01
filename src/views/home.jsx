import React, { Component } from 'react';

import {
    Button,
    TextField,
    Toolbar,
} from 'react-md'

import * as logo from '../assets/achievempls-logo-white.png';

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    onEmailChange = (e) => {
        const email = e;
        this.setState({ email: email });
    }

    onPWChange = (e) => {
        const pw = e;
        this.setState({ password: pw });
    }

    submitLogin = () => {
        const { email, password } = this.state;
        console.log(email, password);
    }

    render() {
        return(
            <div className='grid'>
                <Toolbar
                    id='login-toolbar'
                    prominent
                    children={<img src={logo} alt='logo' className='login-logo' />}
                    className='login-toolbar'
                />
                <div className='login-content'>
                    <div className='login-fields'>
                        <TextField
                            id='email'
                            label='Email'
                            className='md-cell-12 md-cell--bottom'
                        />
                        <TextField
                            id='password'
                            label='Password'
                            className='md-cell-12 md-cell--bottom'
                        />
                        <p>Forgot Password</p>
                        <Button raised primary onClick={this.submitLogin}>Login</Button>
                    </div>
                </div>
            </div>


        )
    }
}