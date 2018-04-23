import React, { Component } from 'react';
import { Button } from 'react-md';

import SingleQuestion from '../SingleQuestion/SingleQuestion';

export default class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: []
        }
    }

    submitAnswers = (e) => {
        this.props.submitAnswers(this.state.answers);
    }

    questionAnswer = (e, id) => {
        const { answers } = this.state;
        const answerObj = { id: id, answer: e }
        // removes the old answerObj of the current answer from the array, so we can add the newer version
        const filteredAnswers = answers.filter((answer) => answer.id !== answerObj.id)
        this.setState({ answers: [ ...filteredAnswers, answerObj ] })
    }

    render() {
        const { questions } = this.props.exitTickets;
        return (
            <div className="page-wrapper">
                <div className="form-wrapper">
                    <div className="question-wrapper">
                        {questions.map((question, idx) => (
                            <SingleQuestion 
                                question={question}
                                onAnswerChange={this.questionAnswer}  
                            />
                        ))}
                    </div>
                    <div className="question-button">
                        <Button raised primary onClick={this.submitAnswers}>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}