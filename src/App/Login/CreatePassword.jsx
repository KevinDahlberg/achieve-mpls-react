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

import * as logo from '../assets/achievempls-logo-white.png';
import { forgotPW, addPW, checkToken } from '../store';

class CreatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            password: '',
            confirm: '',
            user: {},
            sending: false,
        }
    }

    componentWillMount() {
        const token = this.props.match.params.id;
        console.log(token);
        checkToken(token)
        .then((res) => {
            const user = res[0];
            this.setState({ user: user });
        })
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
        const { password, user } = this.state;
        e.preventDefault();
        this.setState({ sending: true, dialogVisible: true });
        addPW(password, user)
        .then(() => {
            this.setState({ sending: false, user: {} });
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
        { forgotPW, addPW, checkToken }, dispatch
    )
)

export default connect(null, dispatchToProps)(CreatePassword);