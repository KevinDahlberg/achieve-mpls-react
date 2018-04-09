import React, { Component } from 'react';
import {
    SelectField
} from 'react-md';

export class YearMenu extends Component {
    render() {
        const { years, currentYear } = this.props;
        const currentPlaceholder = currentYear + ' - ' + (currentYear + 1);
        return(
            <SelectField
                id='year-dropdown-menu'
                menuItems={years}
                placeholder={currentPlaceholder}
                sameWidth={true}
                simplifiedMenu={true}
                className='md-cell--2'
            />
        )
    }
}