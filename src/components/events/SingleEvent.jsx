import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    DatePicker,
    DialogContainer,
    SelectField,
    TextField,
} from 'react-md';

export default class SingleEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event,
        }
    }

    hide = () => {
        this.props.hide();
    }

    onEventNumberChange = (e) => {
        this.setState({ event: { ...this.state.event, event_number: e } });
    }

    onFormChange = (e) => {
        this.setState({ event: { ...this.state.event, form: e } });
    }

    onOpenDateChange = (e) => {
        this.setState({ event: { ...this.state.event, openDate: e } });
    }

    onCloseDateChange = (e) => {
        this.setState({ event: { ...this.state.event, closeDate: e } });
    }

    onSubmit = () => {
        const { submitEvent, hide } = this.props;
        const { event } = this.state;
        submitEvent(event);
        hide();
        this.setState({ event: {} });
    }

    render() {
        const { visible, type, formArray } = this.props;
        const { event } = this.state;
        return(
            <DialogContainer
                id='single-event-container'
                aria-label='single event container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
                width={400}
            >
                <h1>{type} Event</h1>
                <TextField
                    id='event-number'
                    label='Event Number'
                    floating={true}
                    value={event.number}
                    onChange={this.onEventNumberChange}
                    className='md-cell md-cell--bottom'
                />
                <SelectField
                    label='Form'
                    id='event-form'
                    value={event.form}
                    onChange={this.onFormChange}
                    className='md-cell md-cell--bottom'
                    menuItems={formArray}
                />
                <DatePicker
                    id='event-date-open'
                    label='Date Open'
                    className='md-cell'
                    value={event.date_open}
                    onChange={this.onOpenDateChange}
                />
                <DatePicker
                    id='event-date-closed'
                    label='Date Closed'
                    className='md-cell'
                    value={event.date_closed}
                    onChange={this.onCloseDateChange}
                />
                <Button floating primary className='dialog-done' onClick={this.onSubmit}>done</Button>
                <Button floating className='dialog-close' onClick={this.hide}>clear</Button>
            </DialogContainer>
        )
    }
}

SingleEvent.propTypes = {
    event: PropTypes.object,
    formArray: PropTypes.array,
    hide: PropTypes.func,
    submitEvent: PropTypes.func,
    type: PropTypes.string,
    visible: PropTypes.bool,
}