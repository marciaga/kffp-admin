import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CSVLink } from 'react-csv';
import DatePicker from 'material-ui/DatePicker';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { updateDateField, submitReport } from '../../actions/reportActions';
import { scopeValidator } from '../../utils/helperFunctions';

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
        const { results } = this.props.reports;

        return (
            <div className="row">
                <h1 className="page-heading">Reports</h1>
                <div className="col col-md-12 flex-horizontal-center">
                    <Card
                        style={{ minWidth: 600 }}
                        containerStyle={{ minWidth: 600 }}
                    >
                        <CardHeader title="Song Reporting" />
                        <CardText>
                            <DatePicker
                                hintText="Start Date"
                                onChange={
                                    (n, date) => this.handleDateChange('startDate', date)
                                }
                            />
                            <DatePicker
                                hintText="End Date"
                                onChange={
                                    (n, date) => this.handleDateChange('endDate', date)
                                }
                            />
                        </CardText>
                        <CardActions>
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
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reports);
