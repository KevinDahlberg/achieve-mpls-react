import React, { Component } from 'react';
import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    TextField,
} from 'react-md';

import { fetchTicketsIfNeeded, fetchYearsIfNeeded } from '../../data/ticketStore';
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
        const { currentYear, fetchTicketsIfNeeded, fetchYearsIfNeeded } = this.props;
        fetchYearsIfNeeded();
        fetchTicketsIfNeeded(currentYear)
        .then((res) => {
            if (res) {
            this.fuse = new Fuse(res, ticketOptions);
            }
        });
    }

    onSearchChange = (e) => {
        this.setState({ searchResults: this.fuse.search(e), search: e });
    }

    onDialogHide = () => {
        this.setState({ visible: false });
    }

    onTicketClick = (ticket) => {
        this.setState({ singleTicket: ticket, visible: true })
    }

    render () {
        const { tickets, years, currentYear } = this.props;
        const { search, searchResults, singleTicket, visible } = this.state;
        return (
            <div className='tab-wrapper'>
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
    currentYear: state.ticketReducer.currentYear,
    years: state.ticketReducer.years,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { fetchTicketsIfNeeded, fetchYearsIfNeeded }, dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Tickets);