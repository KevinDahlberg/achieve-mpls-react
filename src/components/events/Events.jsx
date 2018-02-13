import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getEvents, fetchSessionsIfNeeded } from '../../data/sessionStore';
import { fetchFormsIfNeeded } from '../../data/formStore';

import EventsTable from './EventsTable';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            fetching: false,
        }
    }

    componentDidMount() {
        const { getEvents, 
                fetchFormsIfNeeded, 
                fetchSessionsIfNeeded,
                sessions,
                currentYear } = this.props;
        this.setState({ fetching: true });
        const id = Number(this.props.match.params.id);
        fetchSessionsIfNeeded(currentYear)
        .then((res) => {
            let result;
            if (res) {
                const currentSession = res.filter((session) => session.session_count === id)
                result = currentSession[0].id;
            } else {
                const currentSession = sessions.filter((session) => session.session_count === id)
                result = currentSession[0].id;
            }
            return result;
        })
        .then((res) => {
            getEvents(res)
            .then((res) => {
                this.setState({ events: res });
                fetchFormsIfNeeded()
                .then((res) => {
                    this.setState({ fetching: false });
                })
            })
        });
    }

    render() {
        const { formArray } = this.props
        const { fetching, events } = this.state;
        return(
            <div>
            <h1>Events for Session {this.props.match.params.id}</h1>
                {fetching ? null :
                    <EventsTable 
                        events={events}
                        formArray={formArray}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sessions: state.sessionReducer.sessions,
    currentYear: state.ticketReducer.currentYear,
    formArray: state.formReducer.forms,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(
        { getEvents, fetchFormsIfNeeded, fetchSessionsIfNeeded }, dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(Events);