import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
    Button,
    DatePicker,
    DialogContainer,
    SelectField,
    TextField,
} from 'react-md';

export class SingleEvent extends Component {
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
        this.setState({ event: { ...this.state.event, event: e } });
    }

    onFormChange = (e) => {
        this.setState({ event: { ...this.state.event, form: e } });
    }

    onOpenDateChange = (e) => {
        this.setState({ event: { ...this.state.event, open: e } });
    }

    onCloseDateChange = (e) => {
        this.setState({ event: { ...this.state.event, close: e } });
    }

    onSubmit = () => {
        const { submitEvent, hide } = this.props;
        const { event } = this.state;
        submitEvent(event);
        hide();
        this.setState({ event: {} });
    }

    prepareFormArray = (formArray) => {
        const newArray = formArray.map((form) => {
            return form.form_name;
        });
        return newArray;
    }

    render() {
        const { visible, type, formArray } = this.props;
        const { event } = this.state;
        console.log(event);
        const preppedForms = this.prepareFormArray(formArray);
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
                width={600}
                height={400}
            >
                <h1>{type} Event</h1>
                <TextField
                    id='event-number'
                    label='Event Number'
                    floating={true}
                    value={event.meeting_count}
                    onChange={this.onEventNumberChange}
                    resize={{ min: 100, max: 200 }}
                />
                <SelectField
                    label='Form'
                    id='event-form'
                    value={event.form_name}
                    onChange={this.onFormChange}
                    menuItems={preppedForms}
                    simplifiedMenu={false}
                />
                <div className="dialog-row">
                    <DatePicker
                        id='event-date-open'
                        label='Date Open'
                        className='md-cell'
                        value={moment(event.date_form_open).format('MMM D, YYYY')}
                        onChange={this.onOpenDateChange}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    />
                    <DatePicker
                        id='event-date-closed'
                        label='Date Closed'
                        className='md-cell'
                        value={moment(event.date_form_close).format('MMM D, YYYY')}
                        onChange={this.onCloseDateChange}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    />
                </div>
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