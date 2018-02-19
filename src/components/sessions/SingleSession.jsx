import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    DialogContainer,
    SelectField,
    TextField,
    TimePicker,
} from 'react-md';

export default class SingleSession extends Component {
    constructor(props){
        super(props);
        this.state = {
            session: this.props.session,
        }
    }

    hide = () => {
        this.props.hide();
    }

    onSubmit = () => {
        const { submitSession } = this.props;
        const { session } = this.state;
        submitSession(session);
    }

    onSessionChange = (e) => {
        this.setState({ session: { ...this.state.session, session_count: e } });
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

    onTimeChange = (e, f, g) => {
        console.log(e, f, g);
        this.setState({ session: { ...this.state.session, start_time: f } });
    }



    render() {
        const { visible, type } = this.props;
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
                    value={session.session_count}
                    onChange={this.onSessionChange}
                    className='md-cell md-cell--bottom'
                />
                <SelectField
                    label='Year'
                    id='session-year'
                    value={session.year}
                    onChange={this.onYearChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['2017']}
                    simplifiedMenu={false}
                />
                <SelectField
                    label='Facilitator'
                    id='session-facilitator'
                    value={session.facilitator}
                    onChange={this.onFacilitatorChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['Amy', 'Amber']}
                    simplifiedMenu={false}
                />
                <SelectField
                    label='Grade'
                    id='session-grade'
                    value={session.grade}
                    onChange={this.onGradeChange}
                    className='md-cell md-cell--bottom'
                    menuItems={[9,12]}
                    simplifiedMenu={false}
                />
                <TextField
                    label='School'
                    id='session-school'
                    floating={true}
                    value={session.school}
                    onChange={this.onSchoolChange}
                    className='md-cell md-cell--bottom'
                />
                <SelectField
                    label='Day'
                    id='session-day'
                    value={session.day}
                    onChange={this.onDayChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays']}
                    simplifiedMenu={false}
                />
                <TimePicker
                    id="session-time"
                    label="Select Time"
                    value={session.start_time}
                    onChange={this.onTimeChange}
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
}