import React, { PropTypes } from 'react';
import { CSVLink } from 'react-csv';
import DatePicker from 'material-ui/DatePicker';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import VolunteerCard from './volunteer-card';
import { updateField, submitReport } from '../../actions/volunteerActions';

const VolunteerReports = ({ scope, startDate, endDate, dispatch, results = [] }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        return startDate && endDate && dispatch(submitReport({ startDate, endDate }));
    };

    return (
        <Card
            style={{ minWidth: 600 }}
            containerStyle={{ minWidth: 600 }}
        >
            <CardHeader title="Volunteer Reports" />
            <VolunteerCard
                handleSubmit={handleSubmit}
            />
            <CardText>
                <DatePicker
                    hintText="Start Date"
                    onChange={
                        (n, date) => dispatch(updateField('startDate', date))
                    }
                />
                <DatePicker
                    hintText="End Date"
                    onChange={
                        (n, date) => dispatch(updateField('endDate', date))
                    }
                />
                <AutoComplete
                    hintText="lux interior"
                    dataSource={['cat', 'dog']}
                    filter={AutoComplete.noFilter}
                    onNewRequest={() => console.log('new requrest')}
                    onUpdateInput={() => console.log('update input')}
                    floatingLabelText="DJ (optional)"
                    fullWidth
                />
            </CardText>
            <CardActions>
                <RaisedButton
                    label="Submit"
                    onClick={handleSubmit}
                />
                {results.length > 0 &&
                    <CSVLink
                        data={results}
                        filename="volunteer-report.csv"
                    >
                        <RaisedButton
                            label="Click here to download CSV file"
                            primary
                        />
                    </CSVLink>
                }
            </CardActions>
        </Card>
    );
};

VolunteerReports.propTypes = {
    dispatch: PropTypes.func,
    endDate: PropTypes.instanceOf(Date),
    results: PropTypes.array,
    scope: PropTypes.string,
    startDate: PropTypes.instanceOf(Date)
};

export default VolunteerReports;
