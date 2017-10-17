import React, { PropTypes } from 'react';
import { CSVLink } from 'react-csv';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import { pathOr, compose } from 'ramda';
import VolunteerCard from './volunteer-card';
import { submitReport, setVolunteerId } from '../../actions/volunteerActions';
import { getUserAutoComplete } from '../../actions/formActions';

const createOptions = a => a.map(r => ({
    label: `${r.firstName} ${r.lastName}`,
    value: r._id
}));
const getSearchResults = compose(
    createOptions,
    pathOr([], ['users', 'searchResults'])
);

const VolunteerReports = ({
    startDate,
    endDate,
    selectedUser,
    dispatch,
    results = [],
    users
}) => {
    const handleUserSearch = v => dispatch(getUserAutoComplete(v));

    const userSearchResults = getSearchResults(users);
    const handleUserSelect = selected => dispatch(setVolunteerId(selected));

    return (
        <Card
            style={{ minWidth: 600 }}
            containerStyle={{ minWidth: 600 }}
        >
            <CardHeader title="Volunteer Reports" />
            <VolunteerCard
                startDate={startDate}
                endDate={endDate}
                userId={selectedUser}
                dispatch={dispatch}
                submitAction={submitReport}
            >
                <AutoComplete
                    hintText="lux interior"
                    dataSource={userSearchResults}
                    dataSourceConfig={{
                        text: 'label',
                        value: 'value'
                    }}
                    filter={AutoComplete.noFilter}
                    onNewRequest={handleUserSelect}
                    onUpdateInput={handleUserSearch}
                    floatingLabelText="DJ (optional)"
                    fullWidth
                />
            </VolunteerCard>
            {results.length > 0 &&
                <CSVLink
                    data={results}
                    filename="volunteer-report.csv"
                >
                    <RaisedButton
                        style={{ margin: '8px', display: 'inline-block' }}
                        label="Click here to download CSV file"
                        primary
                    />
                </CSVLink>
            }
        </Card>
    );
};

VolunteerReports.propTypes = {
    dispatch: PropTypes.func,
    endDate: PropTypes.instanceOf(Date),
    results: PropTypes.array,
    selectedUser: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    users: PropTypes.object
};

export default VolunteerReports;
