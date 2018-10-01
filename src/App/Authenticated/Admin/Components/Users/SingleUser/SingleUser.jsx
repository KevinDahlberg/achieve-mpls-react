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
        const prepedUser = this.prepareUserYearObj(user);
        this.setState({ user: prepedUser });
    }

    componentWillReceiveProps() {
        const { user } = this.props;
        this.setState({ user });
    }

    addYear = () => {
        const { user } = this.state;
        const newYear = {
            session: '',
            year: '',
        }
        user.years = [newYear, ...user.years]
        this.setState({ user });
    }

    deleteYear = (idx) => {
        const { user } = this.state;
        const yearArray = user.years.filter((year, index) => index !== idx);
        user.years = yearArray;
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

    onSessionChange = (val, idx) => {
        const { user } = this.state;
        user.years[idx].session = val;
        this.setState({ user });
    }

    onYearChange = (val, idx) => {
        const { user } = this.state;
        user.years[idx].year = val;
        this.setState({ user });
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

    prepareUserYearObj = (user) => {
        console.log(user);
        const years = user.years.map(year => {
            year.year = year.year.toString() + ' - ' + (parseInt(year.year) + 1)
            return year
        });
        user.years = years;
        return user;
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
                {user.years.map((year, idx) => {
                    return (
                        <div key={idx}>
                            <SelectField
                                label='Session'
                                id='session'
                                name='session'
                                value={year.session}
                                onChange={(val) => this.onSessionChange(val, idx)}
                                simplifiedMenu={false}
                                className='md-cell md-cell--bottom'
                                menuItems={sessionArray}
                            />
                            <SelectField
                                label='Year'
                                id='year'
                                name='year'
                                value={year.year}
                                onChange={(val) => this.onYearChange(val, idx)}
                                simplifiedMenu={false}
                                className='md-cell md-cell--bottom'
                                menuItems={yearArray}
                            />
                            <Button icon className='dialog-clear' onClick={(e) => this.deleteYear(idx)}>clear</Button>
                        </div>
                    )
                })}
                <Button icon onClick={this.addYear}>add</Button>
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
