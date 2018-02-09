import React, { Component } from 'react';
import {
    DialogContainer,
    TextField,
    Button,
} from 'react-md'

export default class SingleForm extends Component {

    hide = () => {
        this.props.hide();
    }

    render() {
        const { form, visible } = this.props;
        return (
            <DialogContainer
                aria-describedby='single-form-container'
                id='single-form-container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
            >
                <h1>Edit Form</h1>
                <TextField
                    id='form-name'
                    label='Form Name'
                    placeholder={form.formName}
                />
                <Button floating primary>confirm</Button>
            </DialogContainer>
        )
    }
}