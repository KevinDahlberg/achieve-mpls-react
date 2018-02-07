import React, { Component } from 'react';
import {
    SelectField
} from 'react-md';

export default class YearMenu extends Component {
    render() {
        return(
            <SelectField
                id='year-dropdown-menu'
                menuItems={['2017', '2018']}
                placeholder='2017'
                className='md-cell'
                simplifiedMenu={true}
            />
        )
    }
}