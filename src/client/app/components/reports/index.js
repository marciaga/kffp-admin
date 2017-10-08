import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { updateDateField, submitReport } from '../../actions/reportActions';
import { scopeValidator } from '../../utils/helperFunctions';
import SongReport from './song-report';
import VolunteerReports from './volunteer-reports';

const mapStateToProps = state => ({
    auth: state.auth,
    reports: state.reports,
    volunteer: state.volunteer
});

class Reports extends Component {
    static propTypes = {
        auth: PropTypes.object,
        dispatch: PropTypes.func,
        reports: PropTypes.object,
        volunteer: PropTypes.object
    }

    componentWillReceiveProps (nextProps) {
        const { user } = nextProps.auth;

        if (this.props.auth.user !== user) {
            const isValid = scopeValidator(user, 'reports');

            if (!isValid) {
                return browserHistory.push('/');
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch, reports } = this.props;
        const { startDate, endDate } = reports;

        // TODO ensure startDate and endDate make sense chronologically?
        return startDate && endDate &&
            dispatch(submitReport({ startDate, endDate }));
    };

    handleDateChange = (field, date) => this.props.dispatch(updateDateField(field, date));


    render () {
        const { dispatch, reports, volunteer } = this.props;
        const { results } = reports;
        const { startDate, endDate, results: volunteerResults } = volunteer;

        return (
            <div className="row">
                <h1 className="page-heading">Reports</h1>
                <div className="col col-md-12 flex-horizontal-center">
                    <SongReport
                        results={results}
                        handleDateChange={this.handleDateChange}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="col col-md-12 flex-horizontal-center">
                    <VolunteerReports
                        dispatch={dispatch}
                        results={volunteerResults}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reports);
