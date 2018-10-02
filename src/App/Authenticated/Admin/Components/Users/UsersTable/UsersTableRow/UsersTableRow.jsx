import React, { Component } from 'react';
import {
    Button,
    TableRow,
    TableColumn,
} from 'react-md'

export class UsersTableRow extends Component {

    resetPW = () => {
        const { user, resetPW } = this.props;
        resetPW(user);
    }

    editUser = () => {
        const { user, editUser } = this.props;
        editUser(user);
    }

    deleteUser = (e) => {
        const { user, deleteUser } = this.props;
        e.stopPropagation();
        deleteUser(user);
    }
    
    viewUser = () => {
        const { user, viewUser } = this.props;
        viewUser(user);
    }

    render() {
        const { user, idx } = this.props;
        return (
            <TableRow key={idx} onClick={this.viewUser}>
                <TableColumn>{user.fname} {user.lname}</TableColumn>
                <TableColumn>{user.email}</TableColumn>
                <TableColumn>{user.role}</TableColumn>
                <TableColumn>{user.session}</TableColumn>
                <TableColumn>
                    <Button icon onClick={this.deleteUser}>delete</Button>
                </TableColumn>
            </TableRow>
        )
    }
}