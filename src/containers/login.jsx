import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import {
    Button,
    DialogContainer,
    TextField,
    Toolbar,
} from 'react-md'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    checkSession,
    login,
} from '../data/userStore'

import * as logo from '../assets/achievempls-logo-white.png';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            visible: false,
        }
    }

    componentWillMount() {
        const { checkSession } = this.props;
        checkSession()
        .then((res) => {
            this.props.history.push('/home');
        })
        .catch((error) => {
            return
        })
    }
    
    showDialog = () => {
        this.setState({ visible: true });
    }

    hideDialog = () => {
        this.setState({ visible: false });
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
        const { login } = this.props;
        const objToSend = {
            email: email,
            password: password,
        }

        login(objToSend)
        .then((res) => {
            this.props.history.push('/home');
        })
        .catch((error) => {
            this.showDialog();
        });
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
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <TextField
                            id='password'
                            label='Password'
                            className='md-cell-12 md-cell--bottom'
                            value={this.state.password}
                            onChange={this.onPWChange}
                            type='password'
                        />
                        <p>Forgot Password</p>
                        <Button raised primary onClick={this.submitLogin}>Login</Button>
                    </div>
                </div>
                <div>
                <DialogContainer
                    id='incorrect-login-dialog'
                    visible={this.state.visible}
                    title='Error'
                    onHide={this.hideDialog}
                    focusOnMount={false}
                >
                    <p>Incorrect Username or Password</p>
                    <Button flat primary onClick={this.hideDialog}>Close</Button>
                </DialogContainer>
            </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.userReducer.isAuthenticated,
    authenticating: state.userReducer.authenticating,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { checkSession, login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);