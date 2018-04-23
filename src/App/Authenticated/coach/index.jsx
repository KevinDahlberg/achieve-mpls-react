import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { 
    Button,
    TextField
} from 'react-md';
import moment from 'moment'

import Questions from './Components/Questions/Questions';

import * as logo from '../../assets/achievempls-logo-white.png';

import { logout } from '../../store';
import { getExitTickets, sendExitTicket } from './store';

class Coach extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching: true,
            sending: false,
        }
    }

    componentWillMount() {
        const { userId, userSession, getExitTickets } = this.props
        getExitTickets(userSession, userId)
        .then(() => {
            this.setState({ fetching: false });
        })
    }

    logout = () => {
        this.props.logout();
    }

    submitAnswers = (answers) => {
        const { exitTickets, sendExitTicket, userSession, userId } = this.props;
        // maps through the questions and returns the answer to each question
        const answeredQuestions = exitTickets.questions.map((question) => {
            const currentAnswer = answers.filter((answer) => answer.id === question.id)[0]
            return { 
                id: question.id, 
                question: question.question, 
                answer: currentAnswer.answer, }
        })
        const date = moment().format('MM-DD-YYYY')
        const answeredTickets = { ...exitTickets, questions: answeredQuestions, dateToday: date };
        sendExitTicket(answeredTickets)
        .then(() => {
            getExitTickets(userSession, userId);
        });
    }

    render() {
        const { exitTickets } = this.props;
        const { fetching } = this.state;
        return (
            <div>
                <header className='coach-header'>
                    <img src={logo} className='coach-logo' alt='achieve mpls logo' />
                    <Button flat onClick={this.logout} className="logout-button">Logout</Button>
                </header>

                {fetching ? null :
                <div>
                    <div className='question-heading'>
                        <h1>Exit Ticket for Event {exitTickets.event}</h1>
                    </div>
                    {exitTickets.length === 0 ? 
                        <div className="page-wrapper">
                            <h3>No tickets open at this time</h3>
                        </div> :
                        <div>
                            <Questions exitTickets={exitTickets} submitAnswers={this.submitAnswers} />
                        </div>
                    }
                </div>
                }
            </div>
        )
    }
}

const stateToProps = state => ({
    exitTickets: state.coachReducer.exitTickets,
    userName: state.authReducer.userName,
    userSession: state.authReducer.userSession,
    userId: state.authReducer.userId,
})

const dispatchToProps = dispatch => bindActionCreators(
    { getExitTickets, logout, sendExitTicket }, dispatch
);

export default connect(stateToProps, dispatchToProps)(Coach);