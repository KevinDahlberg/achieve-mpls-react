import React, { Component } from 'react'
import {
    Button,
    DataTable,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

export default class FormsTable extends Component {

    formClick = (form, e) => {
        this.props.formClick(form);
    }

    render() {
        const { forms } = this.props;
        return(
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
                            <TableRow key={idx} onClick={(e) => this.formClick(form, e)}>
                                <TableColumn>{form.form_name}</TableColumn>
                                <TableColumn><Button raised primary>Assign</Button></TableColumn>
                                <TableColumn><Button icon>create</Button></TableColumn>
                                <TableColumn><Button icon>delete</Button></TableColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            </Paper>

        ) 
    }
}