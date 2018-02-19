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
            user: this.props.user
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
        this.setState({ user: { ...this.state.user, role: e } });
    }

    onSessionChange = (e) => {
        this.setState({ user: { ...this.state.user, session_count: e } });
    }

    onYearChange = (e) => {
        this.setState({ user: { ...this.state.user, year: e } });
    }

    onSubmit = () => {
        const { submitUser, hide } = this.props;
        const { user } = this.state;
        submitUser(user);
        hide();
        this.setState({ user: {} });
    }

    prepareSessionsForSelect = (sessions) => {
        console.log(sessions);
        return sessions.map((session) => session.session_count);
    }

    prepareYearsForSelect = (years) => {
        const changedYears = years.map((year) => {
            const newYear = year.split(' ').slice(0,1);
            return newYear[0];
        })
        return changedYears
    }

    render() {
        const { sessions, visible, type, years } = this.props;
        const { user } = this.state;
        const sessionArray = this.prepareSessionsForSelect(sessions);
        const yearArray = this.prepareYearsForSelect(years);
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
                <h1>{type} User</h1>
                <SelectField
                    label='Session'
                    id='user-session'
                    value={user.session_count}
                    onChange={this.onSessionChange}
                    simplifiedMenu={false}
                    className='md-cell md-cell--bottom'
                    menuItems={sessionArray}
                />
                <SelectField
                    label='Year'
                    id='user-year'
                    value={user.year}
                    onChange={this.onYearChange}
                    simplifiedMenu={false}
                    className='md-cell md-cell--bottom'
                    menuItems={yearArray}
                />
                <SelectField
                    label='Role'
                    id='user-role'
                    controlled='true'
                    value={user.role}
                    simplifiedMenu={false}
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
    sessions: PropTypes.array,
    submitUser: PropTypes.func,
    type: PropTypes.string,
    user: PropTypes.object,
    visible: PropTypes.bool,
}