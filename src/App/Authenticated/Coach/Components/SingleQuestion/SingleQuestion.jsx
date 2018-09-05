import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    TextField, 
    SelectField,
} from 'react-md'

export default class SingleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        }
    }

    componentWillMount(){
    }

    onAnswerChange = (e, id) => {
        this.props.onAnswerChange(e, id);
        this.setState({ answer: e });
    }

    render() {
        const { question } = this.props;
        const { answer } = this.state;
        return (
            <div className="question-container">
                <TextField 
                    id='question'
                    label={question.question}
                    floating={true}
                    value={answer}
                    onChange={(e) => this.onAnswerChange(e, question.id)}
                    rows={1}
                />
            </div>
        )
    }
}

SingleQuestion.propTypes = {
    question: PropTypes.object,
    onAnswerChange: PropTypes.func,
}