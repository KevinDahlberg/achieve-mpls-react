import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { 
    Button,
    TextField
} from 'react-md';
import moment from 'moment'

import Questions from './components/Questions/Questions';

import * as logo from '../../../assets/achievempls-logo-white.png';

import { logout } from '../../../containers/Auth/store/operations';
import { 
    getExitTickets,
    setCurrentTicket, 
    submitExitTicket, 
    getCompletedTickets, 
    filterTickets } from './store/operations';

class Coach extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching: true,
            sending: false,
        }
    }

    componentWillMount() {
        const { getExitTickets, getCompletedTickets, filterTickets } = this.props
        getExitTickets()
        .then(() => {
            getCompletedTickets()
            .then(() => {
                filterTickets();
            })
        })
    }

    onAnswerChange = (e, idx) => {
        const { coachReducer, setCurrentTicket } = this.props;
        const ticket = coachReducer.currentTicket;
        ticket.form.questions[idx].answer = e
        setCurrentTicket(ticket);
    }

    handleSubmitTicket = () => {
        const { submitExitTicket, getExitTickets, getCompletedTickets, filterTickets } = this.props;
        submitExitTicket()
        .then(() => {
            getExitTickets()
            .then(() => {
                getCompletedTickets()
                .then(() => {
                    filterTickets();
                })
            })
        })
    }
    
    logout = () => {
        this.props.logout();
    }

    render() {
        const { coachReducer, submitExitTicket } = this.props;
        return (
            <div>
                <header className='coach-header'>
                    <img src={logo} className='coach-logo' alt='achieve mpls logo' />
                    <Button flat onClick={this.logout} className="logout-button">Logout</Button>
                </header>

                {coachReducer.isFetchingCompleted ? null :
                <div>
                    {coachReducer.currentTicket ? 
                    <React.Fragment>
                        <div className='question-heading'>
                            <h1>Exit Ticket for Event {coachReducer.currentTicket.event}</h1>
                        </div>
                        <div>
                            <Questions 
                                exitTickets={coachReducer.currentTicket} 
                                submitAnswers={this.handleSubmitTicket}
                                answerChange={this.onAnswerChange}
                            />
                        </div>
                    </React.Fragment> :
                    <React.Fragment>
                    {coachReducer.session.events ?
                    <div className="page-wrapper">
                        <h3>No tickets open at this time</h3>
                    </div> :
                    <div className="page-wrapper">
                        <h3>Thank you for registering</h3>
                        <p>Please contact the Graduation Coaches Manager to complete your registration</p>
                    </div>}
                    </React.Fragment>
                    }
                </div>
                }
            </div>
        )
    }
}

const stateToProps = state => ({
    coachReducer: state.coachReducer,
    authReducer: state.authReducer,
})

const dispatchToProps = dispatch => bindActionCreators(
    { getExitTickets, logout, setCurrentTicket , submitExitTicket, getCompletedTickets, filterTickets }, dispatch
);

export default connect(stateToProps, dispatchToProps)(Coach);