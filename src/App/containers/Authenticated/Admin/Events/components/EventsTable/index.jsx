import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Button,
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import EventsTableRow from '../EventsTableRow';

export default class EventsTable extends Component {

    render() {
        const { events, formArray, editEvent, deleteEvent } = this.props;
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
                                    index={idx}
                                    deleteEvent={deleteEvent}
                                    editEvent={editEvent}
                                    formArray={formArray}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
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