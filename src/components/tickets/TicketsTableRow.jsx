import React, { Component } from 'react';
import moment from 'moment';
import {
    TableRow,
    TableColumn,
} from 'react-md'

export default class TicketsTableRow extends Component {
    viewTicket = () => {
        const { ticket, viewTicket } = this.props
        viewTicket(ticket);
    }

    render() {
        const { ticket, idx } = this.props;
        return (
            <TableRow key={idx} onClick={this.viewTicket}>
            <TableColumn>{ticket.session_count}</TableColumn>
            <TableColumn>{ticket.meeting_count}</TableColumn>
            <TableColumn>{ticket.fname} {ticket.lname}</TableColumn>
            <TableColumn>{ticket.response[0].answer}</TableColumn>
            <TableColumn>{ticket.facilitator}</TableColumn>
            <TableColumn>{ticket.day}</TableColumn>
            <TableColumn>{ticket.start_time}</TableColumn>
            <TableColumn>{ticket.school}</TableColumn>
            <TableColumn>{moment(ticket.date_form_completed).format('MMM D, YYYY')}</TableColumn>
        </TableRow>
        )
    }
}