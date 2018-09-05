import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, DialogContainer, TextField, SelectField } from 'react-md';

export class AddYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newYear: {
                year: '',
                sessions: '',
            }
        }
    }

    componentWillMount() {
        const nextYear = parseFloat(this.filterYears(this.props.years)) + 1;
        this.setState({ newYear: { ...this.state.newYear, year: nextYear } });
    }
    hide = () => {
        this.props.hide();
    }

    onSubmit = () => {
        // todo - add error checking around year being a number, and the year already existing
        const { newYear } = this.state;
        newYear.year = newYear.year.toString();
        this.props.createNewYear(this.state.newYear);
        this.hide();
    }

    filterYears = (years) => {
        const maxYear = years.reduce((acc, el) => {
            return Math.max(acc.year, el.year);
        });
        return maxYear;
    }

    onInputChange = (value, e) => {
        this.setState({ newYear: { ...this.state.newYear, [e.target.id]: value } });
    }

    render() {
        const { visible, years } = this.props;
        let { newYear } = this.state;
        return (
            <DialogContainer
                aria-describedby="new-year-container"
                id="new-year-container"
                visible={visible}
                onHide={this.hide}
                focusOnMount={false}
                portal={true}
                lastChild={true}
                disableScrollLocking={true}
                renderNode={document.body}
                width={400}
            >
                <TextField
                    id="year"
                    label="Year"
                    floating={true}
                    value={newYear.year}
                    placeholder={newYear.year.toString()}
                    onChange={this.onInputChange}
                />
                <TextField
                    id="sessions"
                    label="Number of Sessions"
                    floating={true}
                    value={newYear.sessions}
                    onChange={this.onInputChange}
                />
                <Button floating primary className='dialog-done' onClick={this.onSubmit}>done</Button>
                <Button floating className='dialog-close' onClick={this.hide}>clear</Button>
            </DialogContainer>
        )
    }
}

AddYear.propTypes = {
    createNewYear: PropTypes.func,
    hide: PropTypes.func,
    visible: PropTypes.bool,
    years: PropTypes.array,
}