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

import { checkLogin, signup } from '../store/operations';

import * as logo from '../../../assets/achievempls-logo-white.png';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPW: '',
            fname: '',
            lname: '',
            visible: false,
            errorMessage: '',
        }
    }

    showDialog = () => {
        this.setState({ visible: true });
    }

    hideDialog = () => {
        this.setState({ visible: false });
    }

    onInputChange = (value, event) => {
        const val = value;
        const name = event.target.name
        this.setState({ [name]: val });
    }

    submitSignup = (e) => {
        e.preventDefault();
        // todo check for real email
        const { email, password, confirmPW, fname, lname } = this.state;
        const { signup } = this.props;
        if (password === confirmPW) {
            signup(email, password, fname, lname)
            .then((res) => {
                this.props.history.push('/login');
            })
            .catch((e) => {
                this.setState({ visible: true, errorMessage: e.message});
            })
        }
    }

    render() {
        return (
            <div className='grid'>
                <Toolbar
                    id='login-toolbar'
                    prominent
                    children={<img src={logo} alt='logo' className='login-logo' />}
                    className='login-toolbar'
                /> 
                <div className='login-content'>
                    <form className='signup-fields' onSubmit={this.submitSignup}>
                        <TextField
                            id='fname'
                            label='fname'
                            className='md-cell-12 md-cell--bottom'
                            name='fname'
                            value={this.state.fname}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            id='lname'
                            label='lname'
                            className='md-cell-12 md-cell--bottom'
                            name='lname'
                            value={this.state.lname}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            id='email'
                            label='email'
                            className='md-cell-12 md-cell--bottom'
                            name='email'
                            value={this.state.email}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            id='password'
                            label='password'
                            className='md-cell-12 md-cell--bottom'
                            name='password'
                            value={this.state.password}
                            onChange={this.onInputChange}
                            type='password'
                        />
                        <TextField
                            id='confirmPW'
                            label='confirmPW'
                            className='md-cell-12 md-cell--bottom'
                            name='confirmPW'
                            value={this.state.confirmPW}
                            onChange={this.onInputChange}
                            type='password'
                        />
                        <Button primary raised onClick={this.submitSignup}>Signup</Button>
                    </form>
                    <NavLink to="/login">Back to Login</NavLink>
                    <div>
                        <DialogContainer
                            id='incorrect-signup-dialog'
                            visible={this.state.visible}
                            title='Error'
                            onHide={this.hideDialog}
                            focusOnMount={false}
                        >
                            <p>{this.state.errorMessage}</p>
                            <p>Please try another email, or if you have forgotten your password, reset it</p>
                            <Button flat primary onClick={this.hideDialog}>Close</Button>
                        </DialogContainer>
                    </div>
                </div>
            </div>
        )   
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { checkLogin, signup }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
