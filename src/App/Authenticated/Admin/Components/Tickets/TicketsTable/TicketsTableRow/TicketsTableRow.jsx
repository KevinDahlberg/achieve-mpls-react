import React, { Component } from 'react';
import moment from 'moment';
import {
    TableRow,
    TableColumn,
} from 'react-md'

export class TicketsTableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: [],
        }
    }
    componentWillMount() {
        const { ticket } = this.props;
        this.filterRatingResponse(ticket.response);
    }

    filterRatingResponse = (responseArr) => {
        const response = responseArr.filter((res) => {
            // todo make this more dynamic.  this works, as long as the question for the rating stays the same
            const strArr = res.question.split(' ');
            return strArr.includes('1-10');
        })
        if (response.length) {
            this.setState({ response });
        } else {
            // catches any question that doesn't have a matching response.
            this.setState({ response: [ { answer: 'NA', question: 'NA' }]});
        }
    }
    viewTicket = () => {
        const { ticket, viewTicket } = this.props
        viewTicket(ticket);
    }

    render() {
        const { ticket, idx } = this.props;
        return (
            <TableRow key={idx} onClick={this.viewTicket}>
                <TableColumn>{ticket.session}</TableColumn>
                <TableColumn>{ticket.event}</TableColumn>
                <TableColumn>{ticket.user.fname} {ticket.user.lname}</TableColumn>
                <TableColumn>{this.state.response[0].answer}</TableColumn>
                <TableColumn>{ticket.facilitator}</TableColumn>
                <TableColumn>{ticket.day}</TableColumn>
                <TableColumn>{ticket.startTime}</TableColumn>
                <TableColumn>{ticket.school}</TableColumn>
                <TableColumn>{moment(ticket.date).format('MMM D, YYYY')}</TableColumn>
            </TableRow>
        )
    }
}