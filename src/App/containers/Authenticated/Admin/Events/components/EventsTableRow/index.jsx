import React, { Component } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md'

export default class EventsTableRow extends Component {
    render() {
        const { event, index, editEvent, deleteEvent } = this.props;
        return(
            <TableRow key={index}>
                <TableColumn>{event.event}</TableColumn>
                {/* <TableColumn>{event.form.name}</TableColumn> */}
                <TableColumn>{moment(event.open).format('MMM D, YYYY')}</TableColumn>
                <TableColumn>{moment(event.close).format('MMM D, YYYY')}</TableColumn>
                <TableColumn><Button icon onClick={() => editEvent(event, index)}>create</Button></TableColumn>
                <TableColumn><Button icon onClick={() => deleteEvent(event, index)}>delete</Button></TableColumn>
            </TableRow>
        )
    }
}

EventsTableRow.propTypes = {
    deleteEvent: PropTypes.func,
    editEvent: PropTypes.func,
    event: PropTypes.object,
}