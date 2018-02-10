import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Button,
    DialogContainer,
    TextField,
    SelectField,
} from 'react-md';

export default class SingleUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                fname: this.props.user.fname,
                lname: this.props.user.lname,
                email: this.props.user.email,
                role: this.props.user.role,
                session_count: this.props.user.session_count,
                year: this.props.user.year,
            }
        }
    }

    hide = () => {
        this.props.hide();
    }

    onFnameChange = (e) => {
        this.setState({ user: { ...this.state.user, fname: e } });
    }
    
    onLnameChange = (e) => {
        this.setState({ user: { ...this.state.user, lname: e } });
    }

    onEmailChange = (e) => {
        this.setState({ user: { ...this.state.user, email: e } });
    }

    onRoleChange = (e) => {
        console.log('role', e)
        this.setState({ user: { ...this.state.user, role: e } });
    }

    onSessionChange = (e) => {
        console.log('session', e)
        this.setState({ user: { ...this.state.user, session_count: e } });
    }

    onYearChange = (e) => {
        console.log('year', e)
        this.setState({ user: { ...this.state.user, year: e } });
    }

    onSubmit = () => {
        const { submitUser, hide } = this.props;
        const { user } = this.state;
        submitUser(user);
        hide();
        this.setState({ user: {} });
    }

    render() {
        const { visible, type } = this.props;
        const { user } = this.state;
        const sessionArray = [1,2,3,4,5,6,7,8]
        const yearArray = [2017, 2018]
        console.log(visible);
        return (
            <DialogContainer
                aria-describedby='single-user-container'
                id='single-user-container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
                width={400}
            >
                <h1>{type} Session</h1>
                <SelectField
                    label='Session'
                    id='user-session'
                    value={user.session_count}
                    onChange={this.onSessionChange}
                    className='md-cell md-cell--bottom'
                    menuItems={sessionArray}
                />
                <SelectField
                    label='Year'
                    id='user-year'
                    value={user.year}
                    onChange={this.onYearChange}
                    className='md-cell md-cell--bottom'
                    menuItems={yearArray}
                />
                <SelectField
                    label='Role'
                    id='user-role'
                    controlled='true'
                    value={user.role}
                    onChange={this.onRoleChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['coach', 'admin']}
                />
                <TextField
                    id='user-fname'
                    label='First Name'
                    floating={true}
                    value={user.fname}
                    onChange={this.onFnameChange}
                    className='md-cell md-cell--bottom'
                    required
                    resize={{ min: 200, max: 350 }}
                    rows={1}
                />
                <TextField
                    id='user-lname'
                    label='Last Name'
                    floating={true}
                    value={user.lname}
                    onChange={this.onLnameChange}
                    className='md-cell md-cell--bottom'
                    required
                    resize={{ min: 200, max: 350 }}
                    rows={1}
                />
                <TextField
                    id='user-email'
                    label='Email'
                    floating={true}
                    value={user.email}
                    onChange={this.onEmailChange}
                    className='md-cell md-cell--bottom'
                    required
                    resize={{ min: 200, max: 350 }}
                    rows={1}
                />
                <Button floating primary className='dialog-done' onClick={this.onSubmit}>done</Button>
                <Button floating className='dialog-close' onClick={this.hide}>clear</Button>
            </DialogContainer>
        )
    }
}

SingleUser.propTypes = {
    hide: PropTypes.func,
    submitUser: PropTypes.func,
    type: PropTypes.string,
    user: PropTypes.object,
    visible: PropTypes.bool,
}