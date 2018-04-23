import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import { sortBy } from 'lodash';
import { 
    DataTable, 
    Paper, 
    TableHeader, 
    TableBody, 
    TableRow, 
    TableColumn,
    TablePagination,
} from 'react-md';

import { ticketOptions } from '../constants';

import { TicketsTableRow } from './TicketsTableRow'

export class TicketsTable extends Component {
    static propTypes = {
        search: PropTypes.string,
        tickets: PropTypes.array,
    }

    constructor(props){
        super(props);
        this.state = {
            ticket: {},
            slicedTickets: this.props.tickets.slice(0,10),
            rows: 10,
            ascending: {
                session_count: true,
                event: true,
                fname: true,
                rating: true,
                facilitator: true,
                day: true,
                school: true,
                completed: true,
            }
        }
    }
    
    componentWillReceiveProps() {
        const { tickets } = this.props;
        const { rows } = this.state;
        const sliceOfTickets = tickets.slice(0,rows);
        this.setState({ slicedTickets: sliceOfTickets });
    }

    // changes all items except the key of the selected item to true, sets
    // state with the currentKey as false.
    setAscending = (currentKey) => {
        const { ascending } = this.state;
        const currentKeyValue = ascending[currentKey];
        Object.keys(ascending).map(key => {
            ascending[key] = true;
        })
        const updatedAscending = { ...ascending, [currentKey]: !currentKeyValue }
        this.setState({ ascending: updatedAscending });
    }

    handlePagination = (start, rowsPerPage) => {
        const { tickets } = this.state;
        this.setState({
            slicedTickets: tickets.slice(start, start + rowsPerPage),
            rows: rowsPerPage,
        })
    }

    viewTicket = (ticket, e) => {
        this.props.onTicketClick(ticket);
    }

    sortArray = (key, ascending) => {
        this.props.sortArray(key, !ascending);
        this.setAscending(key);
    }
    
    render() {
        const { tickets } = this.props;
        const { ascending, slicedTickets } = this.state
        return (
            <Paper
                zDepth={2}
                className='table-wrapper'
            >
                <DataTable plain>
                    <TableHeader>
                        <TableRow>
                            <TableColumn
                                sorted={ascending.session_count}
                                onClick={(e) => this.sortArray('session_count', ascending.session_count)}
                                role="button"
                            >
                                Session
                            </TableColumn>
                            <TableColumn
                                sorted={ascending.event}
                                onClick={(e) => this.sortArray('event', ascending.event)}
                                role="button"
                            >
                                Event
                            </TableColumn>
                            <TableColumn
                                sorted={ascending.fname}
                                onClick={(e) => this.sortArray('fname', ascending.fname)}
                                role="button"
                            >
                                Coach Name
                            </TableColumn>
                            {/* <TableColumn
                                sorted={ascending.rating}
                                onClick={(e) => this.sortArray('rating', ascending.rating)}
                                role="button"
                            > */}
                            <TableColumn>
                                Rating
                            </TableColumn>
                            <TableColumn
                                sorted={ascending.facilitator}
                                onClick={(e) => this.sortArray('facilitator', ascending.facilitator)}
                                role="button"
                            >
                                Facilitator
                            </TableColumn>
                            <TableColumn
                                sorted={ascending.day}
                                onClick={(e) => this.sortArray('day', ascending.day)}
                                role="button"
                            >
                                Day
                            </TableColumn>
                            <TableColumn>Start Time</TableColumn>
                            <TableColumn
                                sorted={ascending.school}
                                onClick={(e) => this.sortArray('school', ascending.school)}
                                role="button"
                            >
                                School
                            </TableColumn>
                            <TableColumn
                                sorted={ascending.dateCompleted}
                                onClick={(e) => this.sortArray('date_form_completed', ascending.date_form_completed)}
                                role="button"
                            >
                                Date Completed
                            </TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {slicedTickets.map((ticket, idx) => (
                            <TicketsTableRow
                                key={idx}
                                idx={idx}
                                ticket={ticket}
                                viewTicket={this.viewTicket}
                            />
                        ))}
                    </TableBody>
                    <TablePagination
                        rows={tickets.length}
                        rowsPerPageLabel={'Tickets Per Page'}
                        onPagination={this.handlePagination}
                    />
                </DataTable>
            </Paper>
        )
    }
}