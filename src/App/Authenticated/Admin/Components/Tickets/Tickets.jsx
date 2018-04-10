import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField } from 'react-md';
import Fuse from 'fuse.js';

import { fetchTicketsIfNeeded, fetchYearsIfNeeded } from '../../store';
import { sortArray } from './utils';

import { TicketsTable } from './TicketsTable';
import { YearMenu } from '../../Shared-Components';
import { SingleTicket } from './SingleTicket';
import { ticketOptions } from './constants';

class TicketsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true,
            search: '',
            singleTicket: '',
            visible: false,
            tickets: [],
        }
    }

    componentWillMount() {
        const { currentYear, fetchTicketsIfNeeded, fetchYearsIfNeeded, tickets } = this.props;
        fetchYearsIfNeeded()
        .then(() => {
            fetchTicketsIfNeeded(currentYear)
            .then((res) => {
                if (res) {
                    this.filterSearch(res, null);
                } else {
                    this.filterSearch(tickets, null);
                }
                this.setState({ fetching: false });
            });
        });
    }

    filterSearch = (tickets, search) => {
        if (search) {
            const ticketsFused = new Fuse(tickets, ticketOptions);
            const searchResults = ticketsFused.search(search);
            this.setState({ tickets: searchResults });
        } else {
            this.setState({ tickets: tickets });
        }
    }

    onSearchChange = (e) => {
        const { tickets } = this.props;
        const ticketsFused = new Fuse(tickets, ticketOptions);
        const searchResults = ticketsFused.search(e);
        searchResults.length === 0 ?
            this.setState({ search: e, tickets: this.props.tickets }) :
            this.setState({ search: e, tickets: searchResults });
    }

    onDialogHide = () => {
        this.setState({ visible: false });
    }

    onTicketClick = (ticket) => {
        this.setState({ singleTicket: ticket, visible: true })
    }

    sortTickets = (key, ascending) => {
        const { tickets } = this.props;
        const { search } = this.state;
        const sortedTickets = sortArray(tickets, key, ascending);
        search.length === 0 ?
            this.filterSearch(sortedTickets, null) :
            this.filterSearch(sortedTickets, search);
    }

    render () {
        const { years, currentYear } = this.props;
        const { tickets, fetching, search, singleTicket, visible } = this.state;
        return (
            <div className='tab-wrapper'>
                {fetching ? null :
                <div>
                    <div className='tab-title'>
                        <h2>Completed Exit Tickets</h2>
                        <YearMenu
                            years={years}
                            currentYear={currentYear}
                        />
                    </div>
                    <div className='tab-items'>
                        <TextField
                            id='search-field'
                            label='Search...'
                            value={search}
                            onChange={this.onSearchChange}
                            size={20}
                            fullWidth={false}
                        />
                    </div>
                    <div className='table-container'>
                        {tickets.length === 0 ? null
                        : <TicketsTable 
                            tickets={tickets}
                            sortArray={this.sortTickets}
                            onTicketClick={this.onTicketClick}
                        />}
                    </div>
                    {singleTicket 
                        ? <SingleTicket 
                            ticket={singleTicket} 
                            visible={visible} 
                            onDialogHide={this.onDialogHide}
                        />
                        : null
                    }
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tickets: state.adminReducer.tickets,
    currentYear: state.adminReducer.currentYear,
    years: state.adminReducer.years,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { fetchTicketsIfNeeded, fetchYearsIfNeeded }, dispatch
    );
}
export const Tickets = connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);