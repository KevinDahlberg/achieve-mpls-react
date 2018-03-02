import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { 
    Button,
    TextField
} from 'react-md';

import * as logo from '../assets/achievempls-logo-white.png';

import { getExitTickets, logout } from '../data/authStore';

class Coach extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetching: false,
            sending: false,
        }
    }

    componentDidMount() {
        const { userName, userSession } = this.props
        this.setState({ fetching: true });
        getExitTickets(userName, userSession)
        .then(() => {
            this.setState({ fetching: false });
        })
    }

    logout = () => {
        this.props.logout();
    }

    render() {
        const { exitTickets } = this.props;
        return (
            <div>
            <header className='coach-header'>
                <img src={logo} className='coach-logo' alt='achieve mpls logo' />
                <Button flat onClick={this.logout} className="logout-button">Logout</Button>
            </header>
            <div>
                {exitTickets.map((ticket) => {
                    <TextField
                        id='question-answer-field'
                        label="Question"
                        value
                    />
                })
                }
            </div>
            </div>
        )
    }
}

const stateToProps = state => ({
    exitTickets: state.coachReducer.exitTickets,
    userName: state.authReducer.userName,
    userSession: state.authReducer.userSession,
})

const dispatchToProps = dispatch => bindActionCreators(
    { getExitTickets, logout }, dispatch
);

export default connect(stateToProps, dispatchToProps)(Coach);