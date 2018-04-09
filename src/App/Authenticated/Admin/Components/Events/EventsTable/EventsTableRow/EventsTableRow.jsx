import React, { Component } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md'

export class EventsTableRow extends Component {

    editEvent = () => {
        const { event, editEvent } = this.props;
        editEvent(event);
    }

    deleteEvent = () => {
        const { event, deleteEvent } = this.props;
        deleteEvent(event);
    }

    render() {
        const { event, index } = this.props;
        return(
            <TableRow key={index}>
                <TableColumn>{event.meeting_count}</TableColumn>
                <TableColumn>{event.form_name}</TableColumn>
                <TableColumn>{moment(event.date_form_open).format('MMM D, YYYY')}</TableColumn>
                <TableColumn>{moment(event.date_form_close).format('MMM D, YYYY')}</TableColumn>
                <TableColumn><Button icon onClick={this.editEvent}>create</Button></TableColumn>
                <TableColumn><Button icon onClick={this.deleteEvent}>delete</Button></TableColumn>
            </TableRow>
        )
    }
}

EventsTableRow.propTypes = {
    deleteEvent: PropTypes.func,
    editEvent: PropTypes.func,
    event: PropTypes.object,
}