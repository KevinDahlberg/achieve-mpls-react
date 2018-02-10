import React, { Component } from 'react';
import {
    DialogContainer,
    TextField,
} from 'react-md';

export default class SingleSession extends Component {

    hide = () => {
        this.props.hide();
    }

    render() {
        const { session, visible, type } = this.props;
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
                    id='session-number'
                    label='Session Number'
                    placeholder={session.session_count}
                    className='md-cell md-cell--bottom'
                />
            </DialogContainer>
        )
    }
}