import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Button,
    DataTable,
    DialogContainer,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import { SingleEvent } from '../SingleEvent';
import { EventsTableRow } from './EventsTableRow';

import { newEvent } from '../constants';

export class EventsTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            event: newEvent,
            editVisible: false,
            deleteVisible: false,
        }
    }

    editHide = () => {
        this.setState({ editVisible: false });
    }

    deleteHide = () => {
        this.setState({ deleteVisible: false });
    }

    editEventClick = (event) => {
        this.setState({ event: event, editVisible: true });
    }

    deleteEventClick = (event) => {
        this.setState({ event: event, deleteVisible: true });
    }

    submitEvent = (event) => {
        const { submitEdit } = this.props;
        this.setState({ editVisible: false });
        submitEdit(event);
    }

    deleteEvent = () => {
        const { deleteEvent } = this.props;
        const { event } = this.state;
        deleteEvent(event);
        this.setState({ event: newEvent, deleteVisible: false });
    }

    render() {
        const { events, formArray } = this.props;
        const { editVisible, event, deleteVisible } = this.state;
        return(
            <div>
                <Paper
                    zDepth={2}
                    className='table-wrapper'
                >
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Event Number</TableColumn>
                                <TableColumn>Assigned Form</TableColumn>
                                <TableColumn>Date Form Opens</TableColumn>
                                <TableColumn>Date Form Closes</TableColumn>
                                <TableColumn>Edit</TableColumn>
                                <TableColumn>Delete</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event, idx) => (
                                <EventsTableRow
                                    event={event}
                                    key={idx}
                                    deleteEvent={this.deleteEventClick}
                                    editEvent={this.editEventClick}
                                    formArray={formArray}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
                {editVisible ?
                    <SingleEvent
                        event={event}
                        visible={editVisible}
                        hide={this.editHide}
                        submitEvent={this.submitEvent}
                        formArray={formArray}
                        type='Edit'
                    /> :
                    null
                }
                {deleteVisible ?
                    <DialogContainer
                        title='Delete Event'
                        id='delete-event-dialog'
                        visible={deleteVisible}
                        onHide={this.deleteHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>Are you sure you want to delete Event {event.event_count}</p>
                        <Button raised primary onClick={this.deleteEvent}>Yes</Button>
                        <Button flat onClick={this.deleteHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                }
            </div>
        )   
    }
}

EventsTable.propTypes = {
    deleteEvent: PropTypes.func,
    events: PropTypes.array,
    formArray: PropTypes.array,
    submitEdit: PropTypes.func,
}