import React, { Component } from 'react'
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

import FormsTableRow from './FormsTableRow';
import AssignForm from './AssignForm';
import SingleForm from './SingleForm';

export default class FormsTable extends Component {
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
        this.setState({ editVisible: false });
    }

    deleteHide = () => {
        this.setState({ deleteVisible: false });
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

    render() {
        const { forms } = this.props;
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
                    /> :
                    null
                }
                {editVisible ?
                    <SingleForm
                        hide={this.editHide}
                        visible={editVisible}
                        form={form}
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