import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import VolunteerCard from '../reports/volunteer-card';
import { submitReport } from '../../actions/volunteerActions';

const hoursThisMonth = (results = []) => results.reduce((acc, o) => (acc + o.hours), 0);

const VolunteerWidget = ({ userId, startDate, endDate, dispatch, results = [] }) => (
    <div>
        <h2>
            Your volunteer hours this month (or specify a date range below and submit):
            <span style={{ fontSize: 18 }}>{hoursThisMonth(results)}</span>
        </h2>
        <FlatButton
            label="want to enter more hours?"
            onClick={() => dispatch(push('/volunteers/entry'))}
        />
        <VolunteerCard
            userId={userId}
            submitAction={submitReport}
            dispatch={dispatch}
            startDate={startDate}
            endDate={endDate}
        />
    </div>
);

VolunteerWidget.propTypes = {
    dispatch: PropTypes.func,
    endDate: PropTypes.instanceOf(Date),
    results: PropTypes.array,
    startDate: PropTypes.instanceOf(Date),
    userId: PropTypes.string
};

export default VolunteerWidget;
