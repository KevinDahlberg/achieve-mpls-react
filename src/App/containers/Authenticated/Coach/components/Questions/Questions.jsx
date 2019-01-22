import React, { Component } from 'react';
import { Button, TextField } from 'react-md';

import SingleQuestion from '../SingleQuestion/SingleQuestion';

export default class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: []
        }
    }

    questionAnswer = (e, id) => {
        const { answers } = this.state;
        const answerObj = { id: id, answer: e }
        // removes the old answerObj of the current answer from the array, so we can add the newer version
        const filteredAnswers = answers.filter((answer) => answer.id !== answerObj.id)
        this.setState({ answers: [ ...filteredAnswers, answerObj ] })
    }

    render() {
        const { exitTickets, answerChange, submitAnswers } = this.props;
        return (
            <div className="page-wrapper">
                <div className="form-wrapper">
                    <div className="question-wrapper">
                        {exitTickets.form.questions.map((question, idx) => (
                            <TextField 
                                id='question'
                                label={question.question}
                                floating={true}
                                value={question.answer}
                                onChange={(e) => answerChange(e, idx)}
                                rows={1}
                             />
                        ))}
                    </div>
                    <div className="question-button">
                        <Button raised primary onClick={() => submitAnswers()}>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}