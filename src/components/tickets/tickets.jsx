import React, { Component } from 'react';
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    TextField,
} from 'react-md';

import { getTickets } from '../../data/ticketStore';
import { ticketOptions } from '../../constants';

import TicketsTable from './TicketsTable';
import YearMenu from './YearMenu';
import SingleTicket from './SingleTicket';

class Tickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            singleTicket: '',
            visible: false,
        }
    }

    componentDidMount() {
        const { currentYear, getTickets } = this.props;
        getTickets(currentYear)
        .then((res) => {
            this.fuse = new Fuse(res, ticketOptions);
            console.log(res)
        });
    }

    onSearchChange = (e) => {
        this.setState({ searchResults: this.fuse.search(e), search: e });
    }

    onDialogHide = () => {
        this.setState({ visible: false });
    }

    onTicketClick = (ticket) => {
        console.log(ticket);
        this.setState({ singleTicket: ticket, visible: true })
    }

    render () {
        const { tickets } = this.props;
        console.log('tickets ', tickets);
        const { search, searchResults, singleTicket, visible } = this.state;
        return (
            <div className='tickets-table-wrapper'>
                <h2>Completed Exit Tickets</h2>
                <div>
                    <YearMenu />
                    <TextField
                        id='search-field'
                        label='Search...'
                        value={search}
                        onChange={this.onSearchChange}
                        className="md-cell md-cell--bottom"
                    />
                </div>
                <div className='tickets-table'>
                    {tickets.length === 0 ? null
                    : <TicketsTable 
                        tickets={search ? searchResults : tickets}
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
        )
    }
}

const mapStateToProps = state => ({
    tickets: state.ticketReducer.tickets,
    currentYear: state.ticketReducer.currentYear
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { getTickets }, dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Tickets);