import React, { Component } from 'react'
import {
    Button,
    DataTable,
    DialogContainer,
    Paper,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
} from 'react-md';

import SingleUser from './SingleUser';
import UsersTableRow from './UsersTableRow';

export default class UsersTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            resetVisible: false,
            editVisible: false,
            deleteVisible: false,
            user: {}
        }
    }

    resetHide = () => {
        this.setState({ resetVisible: false });
    }

    editHide = () => {
        this.setState({ editVisible: false });
    }

    deleteHide = () => {
        this.setState({ deleteVisible: false });
    }

    resetPWClick = (user) => {
        console.log('reset pw clicked ', user);
        this.setState({ user: user, resetVisible: true });
    }
    
    deleteUser = (user) => {
        console.log('delete user clicked');
        this.deleteHide();
    }

    editUserClick = (user) => {
        this.setState({ user: user, editVisible: true });
    }

    deleteUserClick = (user) => {
        this.setState({ user: user, deleteVisible: true });
    }

    submitUser = (user) => {
        console.log(user);
    }

    render() {
        const { users } = this.props;
        const { user, resetVisible, editVisible, deleteVisible } = this.state;
        return (
            <div>
                <Paper
                    zDepth={2}
                    className='table-wrapper'
                >
                    <DataTable plain>
                        <TableHeader>
                            <TableRow>
                                <TableColumn>Registration</TableColumn>
                                <TableColumn>Name</TableColumn>
                                <TableColumn>Email</TableColumn>
                                <TableColumn>Role</TableColumn>
                                <TableColumn>Session</TableColumn>
                                <TableColumn>Status</TableColumn>
                                <TableColumn>Edit</TableColumn>
                                <TableColumn>Delete</TableColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, idx) => (
                                <UsersTableRow
                                    user={user}
                                    key={idx}
                                    deleteUser={this.deleteUserClick}
                                    editUser={this.editUserClick}
                                    resetPW={this.resetPWClick}
                                />
                            ))}
                        </TableBody>
                    </DataTable>
                </Paper>
                {resetVisible ? 
                    <DialogContainer
                        title="Register User"
                        id="register-user-dialog"
                        visible={resetVisible}
                        onHide={this.resetHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>You are inviting {user.fname} {user.lname} to join AchiveMpls.</p>
                        <Button raised primary onClick={this.resetPW}>Yes</Button>
                        <Button flat onClick={this.resetHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                }
                {editVisible ?
                    <SingleUser
                        user={user}
                        visible={editVisible}
                        hide={this.editHide}
                        submitUser={this.submitUser}
                        type='Edit'
                    /> :
                    null
                }
                {deleteVisible ?
                    <DialogContainer
                        title='Delete User'
                        id="delete-user-dialog"
                        visible={deleteVisible}
                        onHide={this.deleteHide}
                        focusOnMount={false}
                        portal={true}
                        lastChild={true}
                        disableScrollLocking={true}
                        renderNode={document.body}
                    >
                        <p>Are you sure you want to delete {user.fname} {user.lname}?</p>
                        <Button raised primary onClick={this.deleteUser}>Yes</Button>
                        <Button flat onClick={this.deleteHide}>Cancel</Button>
                    </DialogContainer> :
                    null
                }
            </div>
        )
    }
}