import React, { Component } from 'react';
import {
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

export default class TicketsTable extends Component {

    onTicketClick = (ticket, e) => {
        this.props.onTicketClick(ticket);
    }
    
    render() {
        const { tickets } = this.props;
        return (
            <Paper
                zDepth={2}
                className='table-wrapper'
            >
                <DataTable plain>
                    <TableHeader>
                        <TableRow>
                            <TableColumn>Session</TableColumn>
                            <TableColumn>Event</TableColumn>
                            <TableColumn>Coach Name</TableColumn>
                            <TableColumn>Rating</TableColumn>
                            <TableColumn>Facilitator</TableColumn>
                            <TableColumn>Day</TableColumn>
                            <TableColumn>Start Time</TableColumn>
                            <TableColumn>School</TableColumn>
                            <TableColumn>Date Completed</TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket, idx) => (
                            <TableRow key={idx} onClick={(e) => this.onTicketClick(ticket, e)}>
                                <TableColumn>{ticket.session_count}</TableColumn>
                                <TableColumn>{ticket.meeting_count}</TableColumn>
                                <TableColumn>{ticket.fname} {ticket.lname}</TableColumn>
                                <TableColumn>{ticket.response[0].answer}</TableColumn>
                                <TableColumn>{ticket.facilitator}</TableColumn>
                                <TableColumn>{ticket.day}</TableColumn>
                                <TableColumn>{ticket.start_time}</TableColumn>
                                <TableColumn>{ticket.school}</TableColumn>
                                <TableColumn>{ticket.date_form_completed}</TableColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            </Paper>
        )
    }
}