import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    DialogContainer,
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import FormsTableRow from '../FormsTableRow';
import AssignForm from '../AssignForm';
import SingleForm from '../SingleForm';

const newForm = {};

export default class FormsTable extends Component {
    static propTypes = {
        deleteForm: PropTypes.func,
        deleteQuestion: PropTypes.func,
        forms: PropTypes.array,
        submitAssign: PropTypes.func,
        submitEdit: PropTypes.func,
        years: PropTypes.array,
    }

    constructor(props){
        super(props)
        this.state = {
            assignVisible: false,
            editVisible: false,
            deleteVisible: false,
            form: {}
        }
    }

    assignHide = () => {
        this.setState({ assignVisible: false });
    }

    editHide = () => {
        this.setState({ editVisible: false, form: newForm });
    }

    deleteHide = () => {
        this.setState({ deleteVisible: false, form: newForm });
    }

    assignClick = (form) => {
        this.setState({ form: form, assignVisible: true });
    }

    editClick = (form) => {
        this.setState({ form: form, editVisible: true });
    }

    deleteClick = (form) => {
        this.setState({ form: form, deleteVisible: true });
    }

    submitAssign = (assign) => {
        const { submitAssign } = this.props;
        submitAssign(assign)
    }

    deleteForm = () => {
        const { deleteForm } = this.props;
        const { form } = this.state;
        deleteForm(form)
        this.deleteHide();
    }

    deleteQuestion = (question) => {
        const { deleteQuestion } = this.props;
        deleteQuestion(question);
    }

    submitEdit = (form) => {
        const { submitEdit } = this.props;
        submitEdit(form);
        this.editHide();
    }

    render() {
        const { forms, years } = this.props;
        const { assignVisible, editVisible, deleteVisible, form } = this.state;
        return(
            <div>
                <Paper
                    zDepth={2}
                    className='table-wrapper'
                >
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Form Name</TableColumn>
                                <TableColumn>Assign Form</TableColumn>
                                <TableColumn>Edit</TableColumn>
                                <TableColumn>Delete</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {forms.map((form, idx) => (
                                <FormsTableRow
                                    form={form}
                                    key={idx}
                                    index={idx}
                                    assignForm={this.assignClick}
                                    editForm={this.editClick}
                                    deleteForm={this.deleteClick}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
                {assignVisible ? 
                    <AssignForm 
                        hide={this.assignHide}
                        visible={assignVisible}
                        form={form}
                        years={years}
                        submitAssign={this.submitAssign}
                    /> :
                    null
                }
                {editVisible ?
                    <SingleForm
                        deleteQuestion={this.deleteQuestion}
                        hide={this.editHide}
                        visible={editVisible}
                        form={form}
                        submitForm={this.submitEdit}
                    /> :
                    null
                }
                {deleteVisible ?
                    <DialogContainer
                        title='Delete Form'
                        id='delete-form-dialog'
                        visible={deleteVisible}
                        onHide={this.deleteHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>Are you sure you want to delete {form.form_name} form?</p>
                        <Button raised primary onClick={this.deleteForm}>Yes</Button>
                        <Button flat onClick={this.deleteHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                }
            </div>
        ) 
    }
}