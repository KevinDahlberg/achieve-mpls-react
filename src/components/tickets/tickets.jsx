import React, { Component } from 'react';
import Fuse from 'fuse.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    TextField,
} from 'react-md';

import { getTickets } from '../../data/ticketStore';

import { options } from '../../constants';
import TicketsTable from './ticketsTable';

class Tickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
        }
    }

    componentDidMount() {
        const { currentYear, getTickets } = this.props;
        getTickets(currentYear)
        .then((res) => {
            this.fuse = new Fuse(res, options);
            console.log(res)
        });
    }

    onSearchChange = (e) => {
        this.setState({ searchResults: this.fuse.search(e), search: e });
    }

    render () {
        const { tickets } = this.props;
        const { search, searchResults } = this.state;
        return (
            <div className='tickets-table-wrapper'>
                <h2>Completed Exit Tickets</h2>
                <div>
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
                    : <TicketsTable tickets={
                        search ? searchResults : tickets} />}
                </div>
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