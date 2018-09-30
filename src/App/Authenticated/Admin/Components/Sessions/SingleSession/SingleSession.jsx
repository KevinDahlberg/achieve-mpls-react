import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Button,
    DialogContainer,
    SelectField,
    TextField,
    TimePicker,
} from 'react-md';

import { newSession } from '../constants';

export class SingleSession extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            session: {
                dayOfWeek: '',
                events: [],
                facilitator: '',
                grade: '',
                id: '',
                school: '',
                session: '',
                startTime: '',
                year: '',
            },
        }
    }

    componentWillMount() {
        const { editing, session } = this.props
        this.setState({ session: { ...this.state.session, start_time: new Date() } });
    }

    hide = () => {
        this.props.hide();
    }

    onSubmit = () => {
        const { submitSession } = this.props;
        const { session } = this.state;
        session.start_time = moment(session.start_time).format('HH:mm:ss');
        submitSession(session);
        this.setState({ session: newSession });
    }

    onInputChange = (val, e) => {
        this.setState({ session: { ...this.state.session, [e.target.name]: val } });
    }

    onSchoolChange = (e) => {
        this.setState({ session: { ...this.state.session, school: e } });
    }

    onYearChange = (e) => {
        this.setState({ session: { ...this.state.session, year: e } });
    }

    onFacilitatorChange = (e) => {
        this.setState({ session: { ...this.state.session, facilitator: e } });
    }

    onGradeChange = (e) => {
        this.setState({ session: { ...this.state.session, grade: e } });
    }

    onDayChange = (e) => {
        this.setState({ session: { ...this.state.session, day: e } });
    }

    onTimeChange = (time, timeStamp, func) => {
        this.setState({ session: { ...this.state.session, start_time: timeStamp } });
    }


    render() {
        const { visible, type, years } = this.props;
        const { session } = this.state;
        return (
            <DialogContainer
                aria-describedby='single-session-container'
                id='single-session-container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
                width={600}
            >
                <h1>{type} Session</h1>
                <TextField
                    label='Session'
                    id='session'
                    floating={true}
                    value={session.session}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                />
                <SelectField
                    label='Year'
                    id='session-year'
                    value={session.year}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                    menuItems={years}
                    simplifiedMenu={false}
                />
                <SelectField
                    label='Facilitator'
                    id='session-facilitator'
                    value={session.facilitator}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['Amy', 'Amber']}
                    simplifiedMenu={false}
                />
                <SelectField
                    label='Grade'
                    id='session-grade'
                    value={session.grade}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                    menuItems={[9,12]}
                    simplifiedMenu={false}
                />
                <TextField
                    label='School'
                    id='session-school'
                    floating={true}
                    value={session.school}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                />
                <SelectField
                    label='Day'
                    id='session-day'
                    value={session.day}
                    onChange={this.onInputChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays']}
                    simplifiedMenu={false}
                />
                <TimePicker
                    id="session-time"
                    label="Select Time"
                    value={session.start_time}
                    onChange={this.onInputChange}
                    lastChild={true}
                    disableScrollLocking={true}
                    renderNode={document.body}
                />
                <Button floating primary className='dialog-done' onClick={this.onSubmit}>done</Button>
                <Button floating className='dialog-close' onClick={this.hide}>clear</Button>
            </DialogContainer>
        )
    }
}

SingleSession.propTypes = {
    hide: PropTypes.func,
    session: PropTypes.object,
    submitSession: PropTypes.func,
    type: PropTypes.string,
    visible: PropTypes.bool,
    years: PropTypes.array,
}