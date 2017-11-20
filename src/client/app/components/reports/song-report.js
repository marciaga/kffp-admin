import React, { PropTypes } from 'react';
import { CSVLink } from 'react-csv';
import DatePicker from 'material-ui/DatePicker';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const SongReport = ({ handleDateChange, handleSubmit, results }) => (
    <Card
        style={{ minWidth: 600 }}
        containerStyle={{ minWidth: 600 }}
    >
        <CardHeader title="Song Reporting" />
        <CardText>
            <DatePicker
                hintText="Start Date"
                onChange={
                    (n, date) => handleDateChange('startDate', date)
                }
            />
            <DatePicker
                hintText="End Date"
                onChange={
                    (n, date) => handleDateChange('endDate', date)
                }
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
);

SongReport.propTypes = {
    handleDateChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    results: PropTypes.array
};

export default SongReport;
