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
                session: true,
                event: true,
                name: true,
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
        Object.keys(ascending).map(key => {
            ascending[key] = true;
        })
        const updatedAscending = { ...ascending, currentKey: false }
        this.setState({ ascending: updatedAscending });
    }

    sortTicketStrings = (key, ascending) => {
        const { tickets } = this.state;
        let sortedTickets = sortBy(tickets, key)
        if (!ascending) {
            sortedTickets.reverse();
        }
        return sortedTickets;
    }

    sortTicketNumbers = (key, ascending) => {
        const { tickets } = this.state;
        let sortedTickets = sortBy(tickets, function(ticket) {
            return Number(ticket);
        });
        if (!ascending) {
            sortedTickets.reverse();
        }
        return sortedTickets;
    }

    sortBySession = () => {
        const { rows, tickets } = this.state;
        const ascendingSession = !this.state.ascendingSession;
        let sorted = sortBy(tickets, function(ticket) {
            return Number(ticket.session_count);
        });
        if (!ascendingSession) {
            sorted.reverse();
        }
        this.setState({
            ascendingSession,
            ascendingEvent: true,
            ascendingName: true,
            ascendingRating: true,
            ascendingFacilitator: true,
            ascendingDay: true,
            ascendingSchool: true,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortByEvent = () => {
        const { rows, tickets } = this.state;
        const ascendingEvent = !this.state.ascendingEvent;
        let sorted = sortBy(tickets, function(ticket) {
            return Number(ticket.meeting_count);
        })
        if(!ascendingEvent) {
            sorted.reverse();
        }
        this.setState({
            ascendingSession: true,
            ascendingEvent,
            ascendingName: true,
            ascendingRating: true,
            ascendingFacilitator: true,
            ascendingDay: true,
            ascendingSchool: true,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortByName = () => {
        const { rows } = this.state;
        const ascendingName = !this.state.ascendingName;
        const sorted = this.sortTicketStrings('fname', ascendingName);
        this.setState({
            ascendingSession: true,
            ascendingEvent: true,
            ascendingName,
            ascendingRating: true,
            ascendingFacilitator: true,
            ascendingDay: true,
            ascendingSchool: true,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortByRating = () => {
        const { rows, tickets } = this.state;
        const ascendingRating = !this.state.ascendingRating;
        let sorted = sortBy(tickets, function(ticket) {
            return Number(ticket.response[0].answer);
        })
        if(!ascendingRating) {
            sorted.reverse();
        }
        this.setState({
            ascendingSession: true,
            ascendingEvent: true,
            ascendingName: true,
            ascendingRating,
            ascendingFacilitator: true,
            ascendingDay: true,
            ascendingSchool: true,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortByFacilitator = () => {
        const { rows } = this.state;
        const ascendingFacilitator = !this.state.ascendingFacilitator;
        const sorted = this.sortTicketStrings('facilitator', ascendingFacilitator)
        this.setState({
            ascendingSession: true,
            ascendingEvent: true,
            ascendingName: true,
            ascendingRating: true,
            ascendingFacilitator,
            ascendingDay: true,
            ascendingSchool: true,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortByDay = () => {
        const { rows } = this.state;
        const ascendingDay = !this.state.ascendingDay;
        const sorted = this.sortTicketStrings('day', ascendingDay)
        this.setState({
            ascendingSession: true,
            ascendingEvent: true,
            ascendingName: true,
            ascendingRating: true,
            ascendingFacilitator: true,
            ascendingDay,
            ascendingSchool: true,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortBySchool = () => {
        const { rows } = this.state;
        const ascendingSchool = !this.state.ascendingSchool;
        const sorted = this.sortTicketStrings('school', ascendingSchool);
        this.setState({
            ascendingSession: true,
            ascendingEvent: true,
            ascendingName: true,
            ascendingRating: true,
            ascendingFacilitator: true,
            ascendingDay: true,
            ascendingSchool,
            ascendingDateCompleted: true,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
    }

    sortByDateCompleted = () => {
        const { rows, tickets } = this.state;
        const ascendingDateCompleted = !this.state.ascendingDateCompleted;
        let sorted = sortBy(tickets, function(ticket) {
            return ticket.date_form_completed;
        });
        if (!ascendingDateCompleted) {
            sorted.reverse();
        }
        this.setState({
            ascendingSession: true,
            ascendingEvent: true,
            ascendingName: true,
            ascendingRating: true,
            ascendingFacilitator: true,
            ascendingDay: true,
            ascendingSchool: true,
            ascendingDateCompleted,
            tickets: sorted,
            slicedTickets: sorted.slice(0,rows),
        })
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
        const { ascending } = this.state
        return (
            <Paper
                zDepth={2}
                className='table-wrapper'
            >
                <DataTable plain>
                    <TableHeader>
                        <TableRow>
                            <TableColumn
                                sorted={ascending.session}
                                onClick={(e) => this.sortArray('session', ascending.session)}
                                role="button"
                            >
                                Session
                            </TableColumn>
                            <TableColumn
                                sorted={ascendingEvent}
                                onClick={this.sortByEvent}
                                role="button"
                            >
                                Event
                            </TableColumn>
                            <TableColumn
                                sorted={ascendingName}
                                onClick={this.sortByName}
                                role="button"
                            >
                                Coach Name
                            </TableColumn>
                            <TableColumn
                                sorted={ascendingRating}
                                onClick={this.sortByRating}
                                role="button"
                            >
                                Rating
                            </TableColumn>
                            <TableColumn
                                sorted={ascendingFacilitator}
                                onClick={this.sortByFacilitator}
                                role="button"
                            >
                                Facilitator
                            </TableColumn>
                            <TableColumn
                                sorted={ascendingDay}
                                onClick={this.sortByDay}
                                role="button"
                            >
                                Day
                            </TableColumn>
                            <TableColumn>Start Time</TableColumn>
                            <TableColumn
                                sorted={ascendingSchool}
                                onClick={this.sortBySchool}
                                role="button"
                            >
                                School
                            </TableColumn>
                            <TableColumn
                                sorted={ascendingDateCompleted}
                                onClick={this.sortByDateCompleted}
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