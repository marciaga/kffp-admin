import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CSVLink } from 'react-csv';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { updateDateField, submitReport } from '../../actions/reportActions';

const mapStateToProps = state => ({
    auth: state.auth,
    reports: state.reports
});

class Reports extends Component {
    static propTypes = {
        auth: PropTypes.object,
        dispatch: PropTypes.func,
        reports: PropTypes.object
    }

    componentWillReceiveProps (nextProps) {
        const { user } = nextProps.auth;

        if (this.props.auth.user !== user) {
            // TODO FIX THIS PERMISSION
            if (user.scope !== 'admin') {
                return browserHistory.push('/');
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch, reports } = this.props;
        const { startDate, endDate } = reports;

        // TODO ensure startDate and endDate make sense chronologically
        return startDate && endDate &&
            dispatch(submitReport({ startDate, endDate }));
    };

    handleDateChange = (field, date) => this.props.dispatch(updateDateField(field, date));


    render () {
        const { results } = this.props.reports;

        return (
            <div>
                <h1>Music Reports</h1>
                <DatePicker
                    hintText="Start Date"
                    onChange={(n, date) => this.handleDateChange('startDate', date)}
                />
                <DatePicker
                    hintText="End Date"
                    onChange={(n, date) => this.handleDateChange('endDate', date)}
                />
                <RaisedButton
                    label="Submit"
                    onClick={this.handleSubmit}
                />
                {results.length > 0 &&
                    <CSVLink
                        data={results}
                        filename="song-report.csv"
                    >
                        <RaisedButton
                            label="Click here to download CSV file"
                            primary
                        />
                    </CSVLink>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reports);
