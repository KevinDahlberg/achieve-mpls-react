import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField, Button } from 'react-md';
import Fuse from 'fuse.js';
import FileSaver from 'file-saver';

import { getTickets, sortTickets, searchTickets, paginateTickets } from './store/operations';
import { setCurrentYear } from '../Years/store/actions';
import { setCurrentTicket } from './store/actions';

import { prepareExcelFromData, dataToBuffer } from '../../../../../utils/excel';

import TicketsTable from './components/TicketsTable';
import YearMenu from '../../../../components/YearMenu';
import SingleTicket from './components/SingleTicket';


class TicketsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: true,
            search: '',
            tableRows: 10,
            visible: false,
        }
    }

    componentWillMount() {
        const { tableRows } = this.state;
        const { getTickets } = this.props;
        getTickets()
            .then(async (res) => {
                await this.onPagination(0, tableRows);
                this.setState({ fetching: false });
            });
    }

    onSearchChange = async (search) => {
        const { tableRows } = this.state;
        const { searchTickets } = this.props;
        await searchTickets(search);
        await this.onPagination(0, tableRows);
    }

    onPagination = (start, rowsPerPage) => {
        console.log('on pagination', start, rowsPerPage);
        const { paginateTickets } = this.props;
        paginateTickets(start, rowsPerPage);
    }

    onDialogHide = () => {
        this.setState({ visible: false });
    }

    onTicketClick = async (ticket) => {
        const { setCurrentTicket } = this.props;
        await setCurrentTicket(ticket);
        this.setState({ visible: true });
    }

    onTicketSort = async (key, ascending) => {
        const { sortTickets} = this.props;
        await sortTickets(key, ascending);
    }

    onYearChange = async (year) => {
        const { tableRows } = this.state;
        const { getTickets, setCurrentYear, years } = this.props;
        const selectedYear = years.years.filter(yr => yr.yearRange === year)[0]
        console.log('selected year', selectedYear);
        await setCurrentYear(parseFloat(selectedYear.year));
        await getTickets();
        await this.onPagination(0, tableRows)
        this.setState({ fetching: false, });
    }

    mapTicketResponses = (tickets) => {
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
        const { years, tickets } = this.props;
        const { fetching, visible } = this.state;
        console.log('currentTicket', tickets.currentTicket);
        return (
            <div className='tab-wrapper'>
                {fetching ? null :
                <div>
                    <div className='tab-title'>
                        <h2>Completed Exit Tickets</h2>
                        <YearMenu
                            years={years.years}
                            currentYear={years.currentYear}
                            onYearChange={this.onYearChange}
                        />
                    </div>
                    <div className='tab-items'>
                        <TextField
                            id='search-field'
                            label='Search...'
                            value={tickets.searchString}
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
                            slicedTickets={tickets.paginatedTickets}
                            sortArray={this.onTicketSort}
                            tickets={tickets.searchString.length > 0 ? tickets.searchedTickets : tickets.originalTickets}
                        />
                    </div>
                    <SingleTicket 
                        ticket={tickets.currentTicket} 
                        visible={visible} 
                        onDialogHide={this.onDialogHide}
                    />
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    tickets: state.tickets,
    years: state.years,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { 
            getTickets,
            paginateTickets,
            searchTickets, 
            setCurrentTicket, 
            setCurrentYear, 
            sortTickets
        }, dispatch
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);