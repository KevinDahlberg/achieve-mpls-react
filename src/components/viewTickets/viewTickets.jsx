import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTickets } from '../../data/ticketStore';

class ViewTickets extends Component {

    componentWillMount() {
        const { currentYear } = this.props;
        getTickets(currentYear);
    }

    render () {
        return (
            <h2>Completed Exit Tickets</h2>
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