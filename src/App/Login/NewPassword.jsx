import React, { Component } from 'react';
import {
    Button,
    DialogContainer,
    LinearProgress,
    TextField,
    Toolbar,
} from 'react-md';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as logo from '../../assets/achievempls-logo-white.png';
import { forgotPW } from '../../data/authStore';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            password: '',
            confirm: '',
            sending: false,
        }
    }

    hideDialog = () => {
        this.setState({ dialogVisible: false})
    }

    backHome = () => {
        this.props.history.push('/login');
    }

    onPasswordChange = (e) => {
        const password = e;
        this.setState({ password: password });
    }

    onConfirmChange = (e) => {
        const confirm = e;
        this.setState({ confirm: confirm });
    }

    submitNewPW = (e) => {
        const { newPW } = this.props;
        const { password } = this.state;
        e.preventDefault();
        this.setState({ sending: true, dialogVisible: true });
        newPW(password)
        .then(() => {
            this.setState({ sending: false });
        });
    }

    render() {
        const { dialogVisible, sending, password, confirm } = this.state;
        return (
            <div className='grid'>
                <Toolbar
                    id='login-toolbar'
                    prominent
                    children={<img src={logo} alt='logo' className='login-logo' />}
                    className='login-toolbar'
                />
                <div className='login-content'>
                <h2>Enter your new password below</h2>
                <form className='login-fields' onSubmit={this.submitNewPW}>
                    <TextField
                        id='password'
                        label='Password'
                        className='md-cell-6 md-cell--bottom'
                        value={password}
                        onChange={this.onPasswordChange}
                        type="password"
                    />
                    <TextField
                        id='confirm=password'
                        label='Confirm Password'
                        className='md-cell-6 md-cell--bottom'
                        value={confirm}
                        onChange={this.onConfirmChange}
                        type="password"
                    />
                    <NavLink to="/login">Back to Login</NavLink>
                    {(password === confirm) ? 
                    <Button raised primary type="submit">Submit</Button> :
                    <Button disabled>Password Must Match</Button>
                    }
                </form>
                </div>
                    <div>
                    <DialogContainer
                        id='progress-confirmation-dialog'
                        visible={dialogVisible}
                        title='Reset Password'
                        onHide={this.hideDialog}
                        focusOnMount={false}
                    >
                        {sending ? 
                            <div>
                                <h3>Sending</h3>
                                <LinearProgress />
                            </div> :
                            <div>
                                <p>Go to Login</p>
                                <Button flat prmiary onClick={this.backHome}>Login</Button>
                            </div>
                        }
                    </DialogContainer>
                </div>
            </div>
        )
    }
}

const dispatchToProps = dispatch => (
    bindActionCreators(
        { forgotPW }, dispatch
    )
)

export default connect(null, dispatchToProps)(ForgotPassword);