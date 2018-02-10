import React, { Component } from 'react';
import {
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import TicketsTableRow from './TicketsTableRow'

export default class TicketsTable extends Component {

    viewTicket = (ticket, e) => {
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
                            <TicketsTableRow
                                key={idx}
                                idx={idx}
                                ticket={ticket}
                                viewTicket={this.viewTicket}
                            />
                        ))}
                    </TableBody>
                </DataTable>
            </Paper>
        )
    }
}