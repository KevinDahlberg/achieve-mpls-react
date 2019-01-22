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
    checkLogin,
    login,
    signup,
} from '../store/operations';

import * as logo from '../../../assets/achievempls-logo-white.png';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            visible: false,
            noRoleVisible: false,
            errorMessage: '',
        }
    }

    showDialog = () => {
        this.setState({ visible: true });
    }

    hideDialog = () => {
        this.setState({ visible: false, noRoleVisible: false });
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
        login(email, password)
        .then((res) => {
            if (res.role === 'admin') {
                this.props.history.push('/admin');
                return
            }
            if (res.role === 'coach') {
                this.props.history.push('/coach');
                return
            }
            if (!res.role) {
                this.setState({
                    email: '',
                    password: '',
                    noRoleVisible: true,
                })
                return
            }

        })
        .catch(e => {
            this.setState({ visible: true, errorMessage: 'Username or Password Incorrect' })
        })
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
                        <NavLink to="register">Register</NavLink>
                        <Button primary raised type="submit">Login</Button>
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
                    {this.state.errorMessage}
                    <Button flat primary onClick={this.hideDialog}>Close</Button>
                </DialogContainer>
                <DialogContainer
                    id='no-role-dialog'
                    visible={this.state.noRoleVisible}
                    title='Thanks for Registering!'
                    onHide={this.hideDialog}
                    focusOnMount={false}
                >
                    <p>Your account information is being processed by the achieve mpls team.  Check back later to access your account.</p>
                    <Button flat primary onClick={this.hideDialog}>Close</Button>
                </DialogContainer>
            </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({ 
    isAuthenticated: state.authReducer.isAuthenticated 
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { checkLogin, login, signup }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));