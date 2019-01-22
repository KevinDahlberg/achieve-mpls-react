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

import * as logo from '../../../assets/achievempls-logo-white.png';
import { forgotPW } from '../store/operations';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            email: '',
            sending: false,
            message: '',
        }
    }

    hideDialog = () => {
        this.setState({ dialogVisible: false})
    }

    backHome = () => {
        this.setState({ email: '' });
        this.props.history.push('/login');
    }

    onEmailChange = (e) => {
        const email = e;
        this.setState({ email: email });
    }

    submitPWReset = (e) => {
        const { forgotPW } = this.props;
        const { email } = this.state;
        e.preventDefault();
        this.setState({ dialogVisible: true })
        forgotPW(email)
        .then(() => {
            this.setState({ message: 'Password Reset Email Sent, Please Check Your Inbox.'})
        })
        .catch((error) => {
            this.setState({ message: 'Reset Email Not Sent.  Please double check your email.'});
        })
    }

    render() {
        const { dialogVisible, sending } = this.state;
        return (
            <div className='grid'>
                <Toolbar
                    id='login-toolbar'
                    prominent
                    children={<img src={logo} alt='logo' className='login-logo' />}
                    className='login-toolbar'
                />
                <div className='login-content'>
                <h2>Enter your Email below to reset your password.</h2>
                <form className='login-fields' onSubmit={this.submitPWReset}>
                    <TextField
                        id='email'
                        label='Email'
                        className='md-cell-6 md-cell--bottom'
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                    <NavLink to="/login">Back to Login</NavLink>
                    <Button raised primary type="submit">Submit</Button>
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
                                <p>{this.state.message}</p>
                                <Button flat primary onClick={(e) => this.setState({ dialogVisible: false })}>Close</Button>
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