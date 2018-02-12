import React, { Component } from 'react';
import {
    Button,
    DialogContainer,
} from 'react-md';

import EventsTable from './EventsTable';

export default class Events extends Component {
    render() {
        const { visible, session, formArray } = this.props
        return(
            <div>
            <h1>Events for Session {session.session_count}</h1>
                <DialogContainer
                    id='event-container'
                    aria-label='event container'
                    visible={visible}
                    fullPage
                    focusOnMount={false}
                    onHide={this.hide}
                    portal={true}
                    disableScrollLocking={true}
                    renderNode={document.body}
                >
                    <EventsTable 
                        formArray={formArray}
                    />
                </DialogContainer>
            </div>
        )
    }
}