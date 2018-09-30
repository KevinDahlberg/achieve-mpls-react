import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Button,
    DialogContainer,
    TextField,
    SelectField,
} from 'react-md';

export class SingleUser extends Component {
    static propTypes = {
        deleteUser: PropTypes.func,
        editing: PropTypes.bool,
        hide: PropTypes.func,
        sessions: PropTypes.array,
        submitUser: PropTypes.func,
        user: PropTypes.object,
        visible: PropTypes.bool,
        years: PropTypes.array,
    }

    constructor(props) {
        super(props)
        this.state = {}
        this.baseState = Object.assign(this.state);
    }

    componentWillMount() {
        const { user } = this.props
        this.setState({ user });
    }

    componentWillReceiveProps() {
        const { user } = this.props;
        this.setState({ user });
    }

    hide = () => {
        this.props.hide();
    }

    onInputChange = (value, event) => {
        this.setState({ user: { ...this.state.user, [event.target.name]: value } });
    }

    onRoleChange = (e) => {
        this.setState({ user: { ...this.state.user, role: e } });
    }

    onSessionChange = (e) => {

        this.setState({ user: { ...this.state.user, session: e } });
    }

    onYearChange = (e) => {
        this.setState({ user: { ...this.state.user, years: [e] } });
    }

    onSubmit = () => {
        const { submitUser, hide } = this.props;
        const { user } = this.state;
        submitUser(user);
        hide();
        this.setState({ user: {} });
    }

    prepareSessionsForSelect = (sessions) => {
        return sessions.map((session) => session.session);
    }

    prepareYearsForSelect = (years) => {
        const changedYears = years.map((year) => {
            return year.yearRange;
        })
        return changedYears
    }

    render() {
        const { sessions, visible, type, years } = this.props;
        const { user } = this.state;
        const sessionArray = this.prepareSessionsForSelect(sessions);
        const yearArray = this.prepareYearsForSelect(years);
        console.log(user);
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
                    id='session'
                    name='session'
                    value={user.session}
                    onChange={this.onSessionChange}
                    simplifiedMenu={false}
                    className='md-cell md-cell--bottom'
                    menuItems={sessionArray}
                />
                <SelectField
                    label='Year'
                    id='year'
                    name='year'
                    value={user.year}
                    onChange={this.onYearChange}
                    simplifiedMenu={false}
                    className='md-cell md-cell--bottom'
                    menuItems={yearArray}
                />
                <SelectField
                    label='Role'
                    id='role'
                    name='role'
                    controlled='true'
                    value={user.role}
                    simplifiedMenu={false}
                    onChange={this.onRoleChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['coach', 'admin']}
                />
                <TextField
                    id='fname'
                    label='First Name'
                    name='fname'
                    floating={true}
                    value={user.fname}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                    required
                    resize={{ min: 200, max: 350 }}
                    rows={1}
                />
                <TextField
                    id='lname'
                    label='Last Name'
                    name='lname'
                    floating={true}
                    value={user.lname}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                    required
                    resize={{ min: 200, max: 350 }}
                    rows={1}
                />
                <TextField
                    id='email'
                    label='Email'
                    name='email'
                    floating={true}
                    value={user.email}
                    onChange={this.onInputChange}
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
