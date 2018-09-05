import React, { Component } from 'react';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md'

export class FormsTableRow extends Component {

    assignForm = () => {
        const { form, assignForm } = this.props;
        assignForm(form);
    }

    editForm = () => {
        const { form, editForm } = this.props;
        editForm(form);
    }

    deleteForm = () => {
        const { form, deleteForm } = this.props;
        deleteForm(form);
    }

    render() {
        const { form, index } = this.props;
        return (
            <TableRow key={index}>
                <TableColumn>{form.name}</TableColumn>
                <TableColumn><Button raised primary onClick={this.assignForm}>Assign</Button></TableColumn>
                <TableColumn><Button icon onClick={this.editForm}>create</Button></TableColumn>
                <TableColumn><Button icon onClick={this.deleteForm}>delete</Button></TableColumn>
            </TableRow>

        )
    }
}