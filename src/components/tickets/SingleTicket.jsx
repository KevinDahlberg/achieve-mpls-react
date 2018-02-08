import React, {Component} from 'react';
import { DialogContainer, Divider } from 'react-md'

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
                width={800}
            >
            <div className='dialog-content'>
                <h1>{ticket.fname} {ticket.lname}</h1>
                <span>Session {ticket.session_count}, Event {ticket.meeting_count}</span>
                <Divider />
                <div className='dialog-row'>
                    <div className='dialog-col'>
                        <div>
                            <span className='dialog-title'>Facilitator: </span>
                            <span className='dialog-text'>{ticket.facilitator}</span>
                        </div>
                        <div>
                            <span className='dialog-title'>School: </span>
                            <span className='dialog-text'>{ticket.school}</span>
                        </div>
                        <div>
                            <span className='dialog-title'>Grade </span>
                            <span className='dialog-text'>{ticket.grade}</span>
                        </div>
                    </div>
                    <div className='dialog-col'>
                        <div>
                            <span className='dialog-title'>Day </span>
                            <span className='dialog-text'>{ticket.day}</span>
                        </div>
                        <div>
                            <span className='dialog-title'>Time </span>
                            <span className='dialog-text'>{ticket.time}</span>
                        </div>
                    </div>
                </div>
                <h2>Responses:</h2>
                <Divider />
                {ticket.response.map((res, idx) => (
                    <div key={idx}>
                        <h2>Question:</h2>
                        <span>{res.question}</span>
                        <h2>Answer:</h2>
                        <span>{res.answer}</span>
                    </div>
                ))}
            </div>
            </DialogContainer>
        )
    }
}