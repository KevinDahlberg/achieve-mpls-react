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

export class AssignForm extends Component {
    static propTypes = {
        hide: PropTypes.func,
        form: PropTypes.object,
        submitAssign: PropTypes.func,
        visible: PropTypes.bool,
        years: PropTypes.array,
    }
    
    constructor(props) {
        super(props);
        this.state = {
            assign: {
                formId: this.props.form.id,
                year: '',
                grade: '',
                date_form_open: new Date(),
                date_form_close: new Date(),
                event: '',
            }
        }
    }

    hide = () => {
        this.props.hide();
    }

    onSubmit = () => {
        const { hide, submitAssign } = this.props;
        const { assign } = this.state;
        submitAssign(assign);
        hide();
    }

    onEventNumberChange = (e) => {
        this.setState({ assign: { ...this.state.assign, event: e } });
    }

    onYearChange = (e) => {
        this.setState({ assign: { ...this.state.assign, year: e } });
    }

    onGradeChange = (e) => {
        this.setState({ assign: { ...this.state.assign, grade: e } });
    }

    onOpenChange = (e) => {
        this.setState({ assign: { ...this.state.assign, date_form_open: e } });
    }

    onCloseChange = (e) => {
        this.setState({ assign: { ...this.state.assign, date_form_close: e } });
    }

    render() {
        const { form, visible, years } = this.props;
        const { assign } = this.state;
        return (
            <DialogContainer
                aria-describedby='assign-form-container'
                id='assign-form-container'
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
                <h1>Assign Form {form.form_name}</h1>
                <TextField
                    id='assign-number'
                    label='Event Number'
                    floating={true}
                    value={assign.event}
                    onChange={this.onEventNumberChange}
                    resize={{ min: 100, max: 200 }}
                />
                <SelectField
                    label='Year'
                    id='session-year'
                    value={assign.year}
                    onChange={this.onYearChange}
                    className='md-cell md-cell--bottom'
                    menuItems={years}
                    simplifiedMenu={false}
                />
                <SelectField
                    label='Grade'
                    id='assign-grade'
                    value={assign.grade}
                    onChange={this.onGradeChange}
                    className='md-cell md-cell--bottom'
                    menuItems={[9,12]}
                    simplifiedMenu={false}
                />
                <div className="dialog-row">
                    <DatePicker
                        id='assign-date-open'
                        label='Date Open'
                        className='md-cell'
                        value={moment(assign.date_form_open).format('MMM D, YYYY')}
                        onChange={this.onOpenChange}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    />
                    <DatePicker
                        id='assign-date-closed'
                        label='Date Closed'
                        className='md-cell'
                        value={moment(assign.date_form_close).format('MMM D, YYYY')}
                        onChange={this.onCloseChange}
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