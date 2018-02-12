import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    DialogContainer,
    TextField,
    Button,
} from 'react-md'

const newForm = {
    form_name: '',
    questions: [
        {question: 'On a scale of 1-10 (with 10 highest) how would you rate your session today?'}
    ],
}

export default class SingleForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: this.props.form,
        }
    }

    hide = () => {
        this.props.hide();
        this.setState({ form: newForm });
    }

    onFormNameChange = (e) => {
        this.setState({ form: { ...this.state, form_name: e }})
    }

    onQuestionChange = (value, index) => {
        const { form } = this.state;
        form.questions[index].question = value;
        this.setState({ form: form });
    }

    addQuestion = () => {
        const { form } = this.state;
        const newQuestion = '';
        form.questions.push(newQuestion);
        this.setState({ form: form });
    }
    
    removeQuestion = (index) => {
        const { form } = this.state;
        form.questions.splice(index, 1);
        this.setState({ form: form});
    }

    onSubmit = () => {
        const { submitForm, hide } = this.props;
        const { form } = this.state;
        submitForm(form);
        this.setState({ form: newForm });
        hide()
    }

    render() {
        const { visible, type } = this.props;
        const { form } = this.state;
        return (
            <DialogContainer
                aria-describedby='single-form-container'
                id='single-form-container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
                width={500}
            >
                <h1>{type} Form</h1>
                <TextField
                    id='form-name'
                    label='Form Name'
                    value={form.form_name}
                    onChange={this.onFormNameChange}
                    className='md-cell md-cell--bottom'
                    required
                    resize={{ min: 200, max: 350 }}
                    rows={1}
                />
                {form.questions.map((question, idx) => {
                    const id = 'form-question' + idx;
                    return (
                    <div className='dialog-row' key={idx}>
                        <TextField
                            id={id}
                            label='Question'
                            value={question.question}
                            onChange={(val) => this.onQuestionChange(val,idx)}
                            className='md-cell md-cell--bottom'
                            resize={{ min: 350, max: 350 }}
                            rows={1}
                        />
                        <Button icon className='dialog-clear' onClick={(e) => this.removeQuestion(idx)}>clear</Button>
                    </div>
                    )
                })}
                <Button floating secondary onClick={this.addQuestion}>add</Button>
                <Button floating primary className='dialog-done' onClick={this.onSubmit}>done</Button>
                <Button floating className='dialog-close' onClick={this.hide}>clear</Button>
            </DialogContainer>
        )
    }
}

SingleForm.propTypes = {
    form: PropTypes.object,
    hide: PropTypes.func,
    submitForm: PropTypes.func,
    type: PropTypes.string,
    visible: PropTypes.bool,
}