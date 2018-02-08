import React, { Component } from 'react';
import { 
    DialogContainer,
    TextField,
} from 'react-md';

export default class SingleUser extends Component {

    hide = () => {
        this.props.hide();
    }

    render() {
        const { user, visible } = this.props;
        console.log(visible);
        return (
            <DialogContainer
                aria-describedby='single-user-container'
                id='single-user-container'
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
            >
                <TextField
                    id='user-fname'
                    label='First Name'
                    placeholder={user.fname}
                    className='md-cell md-cell--bottom'
                />
                <TextField
                    id='user-lname'
                    label='Last Name'
                    placeholder={user.lname}
                    className='md-cell md-cell--bottom'
                />
                <TextField
                    id='user-email'
                    label='Email'
                    placeholder={user.email}
                    className='md-cell md-cell--bottom'
                />
                <TextField
                    id='user-session'
                    label='Session'
                    placeholder={user.session_count}
                    className='md-cell md-cell--bottom'
                />
                <TextField
                    id='user-year'
                    label='Year'
                    placeholder={user.year}
                    className='md-cell md-cell--bottom'
                />
            </DialogContainer>
        )
    }
}