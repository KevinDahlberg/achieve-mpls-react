import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';

import {
    assignForm,
    createForm,
    deleteForm,
    getForms,
    updateForm,
} from './store/operations';

import { prepareYearsForSelect } from '../../../../../utils/years';

import FormsTable from './components/FormsTable';
import SingleForm from './components/SingleForm';

const newForm = {
    form_name: '',
    questions: [
        {question: 'On a scale of 1-10 (with 10 highest) how would you rate your session today?'}
    ],
}

class FormsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: newForm,
            addVisible: false,
            fetching: true,
        }
    }

    componentWillMount() {
        const { getForms } = this.props;
        getForms();
    }

    addFormHide = () => {
        this.setState({ addVisible: false })
    }

    addFormClick = () => {
        this.setState({ addVisible: true });
    }

    submitAddForm = (form) => {
        const { getForms, createForm } = this.props;
        createForm(form)
        .then((res) => {
            getForms();
        })
    }

    submitAssign = (assign) => {
        this.props.assignForm(assign);
    }

    updateForm = (form) => {
        const { getForms, updateForm } = this.props;
        updateForm(form)
        .then(() => {
            getForms();
        });
    }

    deleteForm = (form) => {
        const { deleteForm, getForms } = this.props;
        deleteForm(form)
        .then(() => {
            getForms();
        })
    }

    deleteQuestion = (question) => {
        // todo - put delete question logic here
        console.log(question);
    }

    //we don't need to call the db on the add form when removing a question
    deleteAddQuestion = (question) => {
        return
    }

    render() {
        const { formsReducer, years } = this.props;
        const { addVisible } = this.state;
        const preppedYears = prepareYearsForSelect(years);
        return(
            <div className='tab-wrapper'>
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
                        <FormsTable
                            deleteQuestion={this.deleteQuestion}
                            deleteForm={this.deleteForm}
                            forms={formsReducer.forms}
                            formClick={this.onFormClick}
                            submitAssign={this.submitAssign}
                            submitEdit={this.updateForm}
                            years={preppedYears}
                        />
                    </div>
                    <SingleForm
                        deleteQuestion={this.deleteQuestion}
                        hide={this.addFormHide}
                        form={formsReducer.currentForm}
                        visible={addVisible}
                        submitForm={this.submitAddForm}
                        type='Add'
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formsReducer: state.formsReducer,
        years: state.adminReducer.years,
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {   
            assignForm,
            createForm,
            deleteForm,
            getForms,
            updateForm,
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsContainer);