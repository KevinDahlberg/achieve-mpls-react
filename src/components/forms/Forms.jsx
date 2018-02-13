import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';

import { fetchFormsIfNeeded } from '../../data/formStore';

import FormsTable from './FormsTable';
import SingleForm from './SingleForm';

const newForm = {
    form_name: '',
    questions: [
        {question: 'On a scale of 1-10 (with 10 highest) how would you rate your session today?'}
    ],
}

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: newForm,
            addVisible: false,
        }
    }

    componentDidMount() {
        const { fetchFormsIfNeeded } = this.props;
        fetchFormsIfNeeded()
        .then((res) => {
            console.log(res)
        })
    }

    addFormHide = () => {
        this.setState({ form: newForm, addVisible: false })
    }

    addFormClick = () => {
        this.setState({ addVisible: true });
    }

    submitAddForm = (form) => {
        console.log(form)
    }

    render() {
        const { forms } = this.props;
        const { form, addVisible } = this.state;
        return(
            <div className='tab-wrapper'>
                <div className='tab-title'>
                    <h2>Ticket Templates</h2>
                </div>
                <div className='tab-items'>
                    <Paper
                        zDepth={2}
                        className='add-wrapper'
                    >
                        <span className='add-text'>Add Form</span>
                        <Button floating primary className='add-button' onClick={this.addFormClick}>add</Button>
                    </Paper>
                </div>
                <div className="table-container">
                    {forms.length === 0 ? null :
                    <FormsTable
                        forms={forms}
                        formClick={this.onFormClick}
                    />}
                </div>
                <SingleForm
                    hide={this.addFormHide}
                    form={form}
                    visible={addVisible}
                    submitForm={this.submitAddForm}
                    type='Add'
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    forms: state.formReducer.forms,
    fetchingForms: state.formReducer.fetchingForms,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { fetchFormsIfNeeded }, dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);