import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md'

export default class EventsTableRow extends Component {

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
                <TableColumn>{event.form}</TableColumn>
                <TableColumn>{event.date_form_open}</TableColumn>
                <TableColumn>{event.date_form_close}</TableColumn>
                <TableColumn><Button icon onClick={this.editEvent}>create</Button></TableColumn>
                <TableColumn><Button icon onClick={this.deleteEvent}>delete</Button></TableColumn>
            </TableRow>
        )
    }
}

EventsTableRow.propTypes = {
    deleteEvent: PropTypes.func,
    editEvent: PropTypes.string,
    event: PropTypes.object,
}