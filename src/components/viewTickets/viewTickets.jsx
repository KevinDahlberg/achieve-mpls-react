import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTickets } from '../../data/ticketStore';

import TicketsTable from './ticketsTable';

class ViewTickets extends Component {

    componentDidMount() {
        const { currentYear, getTickets } = this.props;
        getTickets(currentYear)
        .then((res) => console.log(res));
    }

    render () {
        const { tickets } = this.props;
        return (
            <div className='tickets-table-wrapper'>
                <h2>Completed Exit Tickets</h2>
                <div className='tickets-table'>
                    {tickets.length === 0 ? null
                    : <TicketsTable tickets={tickets} />}
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewTickets);