import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    DialogContainer,
} from 'react-md';

import EventsTable from './EventsTable';

export default class Events extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
    }
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
                    lastChild={true}
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

Events.propTypes = {
    formArray: PropTypes.array,
    session: PropTypes.object,
    visible: PropTypes.bool,
}