import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, Button } from 'react-md';
import Fuse from 'fuse.js';
import FileSaver from 'file-saver';

import { fetchTicketsIfNeeded, fetchYearsIfNeeded, fetchTickets, fetchYears } from '../../store';
import { sortArray } from '../../utils';
import { prepareExcelFromData, dataToBuffer } from './utils';
import { ticketOptions } from './constants';

import { TicketsTable } from './TicketsTable';
import { YearMenu } from '../../Shared-Components';
import { SingleTicket } from './SingleTicket';


class TicketsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true,
            search: '',
            singleTicket: '',
            slicedTickets: [],
            tickets: [],
            tableRows: 10,
            visible: false,
            years: [],
        }
    }

    componentWillMount() {
        const { tableRows } = this.state;
        const { currentYear, fetchTicketsIfNeeded, tickets, fetchYearsIfNeeded } = this.props;
        fetchTicketsIfNeeded(currentYear)
            .then((res) => {
                if (res) {
                    this.filterSearch(res, null);
                } else {
                    this.filterSearch(tickets, null);
                }
                fetchYearsIfNeeded()
                .then((res) => {
                    if (res) {
                        this.setState({ years: res})
                    }
                })
                const sliceOfTickets = this.state.tickets.slice(0, tableRows);
                this.setState({ fetching: false, slicedTickets: sliceOfTickets });
            });
    }

    onSearchChange = (e) => {
        const { tickets } = this.props;
        this.filterSearch(tickets, e);
    }

    onYearChange = (year) => {
        const { years, tableRows } = this.state;
        const { fetchTickets } = this.props;
        const selectedYear = years.filter(yr => yr.yearRange === year)[0]
        fetchTickets(parseFloat(selectedYear.year))
        .then((res) => {
            this.filterSearch(res, null);
            const sliceOfTickets = this.state.tickets.slice(0, tableRows);
            this.setState({ fetching: false, slicedTickets: sliceOfTickets });
        })
    }

    filterSearch = (tickets, search) => {
        const { tableRows } = this.state;
        if (search) {
            const ticketsFused = new Fuse(tickets, ticketOptions);
            const searchResults = ticketsFused.search(search);
            this.setState({ tickets: searchResults, search: search });
            this.onPagination(0, tableRows);
        } else {
            this.setState({ tickets: tickets, search: '' });
            this.onPagination(0, tableRows);
        }
    }

    onPagination = (start, rowsPerPage) => {
        const { tickets } = this.state;
        this.setState({
            slicedTickets: tickets.slice(start, start + rowsPerPage),
            tableRows: rowsPerPage,
        })
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

    mapTicketResponses = async (tickets) => {
        const newTicketArray = tickets.map((ticket) => {
            const response = ticket.response.map((question, idx) => {
                const questionKey = `${idx + 1}_question`;
                const answerKey = `${idx + 1}answer`;
                return { [questionKey]: question.question, [answerKey]: question.answer }
            });
            const questions = Object.assign({}, ...response);
            delete ticket.response;
            const newTicket = { ...ticket, ...questions };
            return newTicket;
        })
        return newTicketArray
    }

    downloadExcelSpreadsheet = async () => {
        const { tickets } = this.props;
        const fixedTickets = await this.mapTicketResponses(tickets);
        const data = await prepareExcelFromData(fixedTickets);
        const buffer = await dataToBuffer(data);
        await FileSaver.saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'tickets.xlsx');
    }

    render () {
        const { years, currentYear } = this.props;
        const { tickets, fetching, search, singleTicket, slicedTickets, visible } = this.state;
        return (
            <div className='tab-wrapper'>
                {fetching ? null :
                <div>
                    <div className='tab-title'>
                        <h2>Completed Exit Tickets</h2>
                        <YearMenu
                            years={years}
                            currentYear={currentYear}
                            onYearChange={this.onYearChange}
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
                        <Button raised primary onClick={this.downloadExcelSpreadsheet}>Download Tickets</Button>
                    </div>
                    <div className='table-container'>
                        <TicketsTable 
                            onPagination={this.onPagination}
                            onTicketClick={this.onTicketClick}
                            slicedTickets={slicedTickets}
                            sortArray={this.sortTickets}
                            tickets={tickets}
                        />
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
        { fetchTicketsIfNeeded, fetchYearsIfNeeded, fetchTickets }, dispatch
    );
}
export const Tickets = connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);