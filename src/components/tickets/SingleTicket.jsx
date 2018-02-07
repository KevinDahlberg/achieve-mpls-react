import React, {Component} from 'react';
import { DialogContainer } from 'react-md'

export default class SingleTicket extends Component {

    hide = () => {
        this.props.onDialogHide();
    }

    render() {
        const { ticket, visible } = this.props;
        return (
            <DialogContainer
                aria-describedby='single-ticket-container'
                id='single-ticket-container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
            >
            <h1>{ticket.fname} {ticket.lname}</h1>
            <p>Session {ticket.session_count}, Event {ticket.meeting_count}</p>
            <h2>Facilitator:</h2>
            <h3>{ticket.facilitator}</h3>
            <h2>School:</h2>
            <h3>{ticket.school}</h3>
            <h2>Day</h2>
            <h3>{ticket.day}</h3>
            <h2>Time</h2>
            <h3>{ticket.time}</h3>
            <h2>Grade</h2>
            <h3>{ticket.grade}</h3>
            <h2>Responses:</h2>
            {ticket.response.map((res, idx) => (
                <div key={idx}>
                    <h2>Question:</h2>
                    <h3>{res.question}</h3>
                    <h2>Answer:</h2>
                    <h3>{res.answer}</h3>
                </div>
            ))}
            </DialogContainer>
        )
    }
}