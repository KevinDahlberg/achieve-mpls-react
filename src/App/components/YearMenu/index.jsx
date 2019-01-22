import React, { Component } from 'react';
import {
    SelectField
} from 'react-md';

export default class YearMenu extends Component {

    filterYearRange = (years) => {
        return years.map(year => {
            return year.yearRange;
        });
    }

    onYearChange = (value) => {
        this.props.onYearChange(value);
    }
    
    render() {
        const { years, currentYear } = this.props;
        const filteredYears = this.filterYearRange(years);
        const currentPlaceholder = currentYear + ' - ' + (currentYear + 1);
        return(
            <SelectField
                id='year-dropdown-menu'
                menuItems={filteredYears}
                placeholder={currentPlaceholder}
                sameWidth={true}
                simplifiedMenu={true}
                className='md-cell--2'
                onChange={this.onYearChange}
            />
        )
    }
}