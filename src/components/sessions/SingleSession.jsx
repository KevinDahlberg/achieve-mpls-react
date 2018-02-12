import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    DialogContainer,
    SelectField,
    TextField,
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

    onSessionChange = (e) => {
        this.setState({ session: { ...this.state.session, session_count: e } });
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
                />
                <SelectField
                    label='Facilitator'
                    id='session-facilitator'
                    value={session.facilitator}
                    onChange={this.onFacilitatorChange}
                    className='md-cell md-cell--bottom'
                    menuItems={['Amy', 'Amber']}
                />
                <SelectField
                    label='Grade'
                    id='session-grade'
                    value={session.grade}
                    onChange={this.onGradeChange}
                    className='md-cell md-cell--bottom'
                    menuItems={[9,12]}
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
                    menuItems={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
                />
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