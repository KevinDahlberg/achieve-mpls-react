import React, { Component } from 'react';
import {
    Button,
    DatePicker,
    DialogContainer,
    TextField,
} from 'react-md';

export default class AssignForm extends Component {

    hide = () => {
        this.props.hide();
    }

    render() {
        const { form, visible } = this.props;
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
            >
                <TextField
                    id='event-number'
                    label='Event Number'
                    className='md-cell md-cell--bottom'
                />
                <Button floating primary>confirm</Button>
            </DialogContainer>
        )
    }
}