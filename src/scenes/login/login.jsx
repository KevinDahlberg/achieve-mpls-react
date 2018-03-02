import React, { Component } from 'react';
import {
    Button,
    DialogContainer,
    TextField,
    Toolbar,
} from 'react-md'
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import {
    checkSession,
    login,
} from '../data/authStore'

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

    submitLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { login } = this.props;
        const objToSend = {
            email: email,
            password: password,
        }
        login(objToSend)
        .then((res) => {
            if (res.role === 'admin') {
                this.props.history.push('/admin');
            } else if (res.role === 'coach') {
                this.props.history.push('/coach');
            } else {
                return
            }
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
                    <form className='login-fields' onSubmit={this.submitLogin}>
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
                        <NavLink to="forgot-password">Forgot Password</NavLink>
                        <Button raised primary type="submit">Login</Button>
                    </form>
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
    isAuthenticated: state.authReducer.isAuthenticated,
    authenticating: state.authReducer.authenticating,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { checkSession, login }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));