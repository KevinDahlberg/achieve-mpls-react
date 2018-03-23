import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';

import {
    addForm,
    assignForms,
    deleteForm,
    deleteQuestion,
    updateForm,
} from './queries';
import { 
    fetchYearsIfNeeded,
    fetchFormsIfNeeded,
    fetchForms, 
} from '../../store';

import { prepareYearsForSelect } from '../../utils';

import FormsTable from './Components/FormsTable';
import SingleForm from './Components/SingleForm';

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
            fetching: true,
        }
    }

    componentWillMount() {
        const { fetchFormsIfNeeded, fetchYearsIfNeeded } = this.props;
        fetchFormsIfNeeded()
        .then((res) => {
            fetchYearsIfNeeded()
            .then(() => {
                this.setState({ fetching: false });
            })
        })
    }

    addFormHide = () => {
        this.setState({ form: newForm, addVisible: false })
    }

    addFormClick = () => {
        this.setState({ addVisible: true });
    }

    submitAddForm = (form) => {
        const { fetchForms } = this.props;
        addForm(form)
        .then((res) => {
            fetchForms()
        })
    }

    submitAssign = (assign) => {
        assignForms(assign);
    }

    updateForm = (form) => {
        const { fetchForms } = this.props;
        updateForm(form)
        .then(() => {
            fetchForms();
        });
    }

    deleteForm = (form) => {
        const { fetchForms } = this.props;
        deleteForm(form)
        .then(() => {
            fetchForms()
        })
    }

    deleteQuestion = (question) => {
        deleteQuestion(question)
    }

    //we don't need to call the db on the add form when removing a question
    deleteAddQuestion = (question) => {
        return
    }

    render() {
        const { forms, years } = this.props;
        const { form, addVisible, fetching } = this.state;
        const preppedYears = prepareYearsForSelect(years);
        return(
            <div className='tab-wrapper'>
                {fetching ? null :
                <div>
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
                            deleteQuestion={this.deleteQuestion}
                            deleteForm={this.deleteForm}
                            forms={forms}
                            formClick={this.onFormClick}
                            submitAssign={this.submitAssign}
                            submitEdit={this.updateForm}
                            years={preppedYears}
                        />}
                    </div>
                    <SingleForm
                        deleteQuestion={this.deleteAddQuestion}
                        hide={this.addFormHide}
                        form={form}
                        visible={addVisible}
                        submitForm={this.submitAddForm}
                        type='Add'
                    />
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    forms: state.adminReducer.forms,
    fetchingForms: state.adminReducer.fetchingForms,
    years: state.adminReducer.years,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {     
            fetchFormsIfNeeded,
            fetchForms,
            fetchYearsIfNeeded,
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);