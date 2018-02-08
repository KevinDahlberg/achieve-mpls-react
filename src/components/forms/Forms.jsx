import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Button,
    Paper,
} from 'react-md';

import { getForms } from '../../data/formStore';

import FormsTable from './FormsTable';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editVisible: false,
            singleForm: {
                form: '',
            }
        }
    }

    componentDidMount() {
        const { getForms } = this.props;
        getForms()
        .then((res) => {
            console.log(res)
        })
    }

    onFormClick = (form) => {
        this.setState({ singleForm: form, editVisible: true });
    }

    render() {
        const { forms } = this.props;
        const { singleForm, editVisible } = this.state;
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
                        <Button floating primary className='add-button'>add</Button>
                    </Paper>
                </div>
                <div className="table-container">
                    {forms.length === 0 ? null :
                    <FormsTable
                        forms={forms}
                        formClick={this.onFormClick}
                    />}
                </div>
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
        { getForms }, dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);