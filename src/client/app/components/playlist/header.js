import React, { PropTypes } from 'react';
import { humanReadableTime } from '../../utils/helperFunctions';

const renderUsers = (users) => {
    if (!users) {
        return;
    }

    const usersString = users.join(' and ');

    return (
        <span>{usersString}</span>
    );
};

const ShowHeader = ({ currentShow }) => {
    const { showName, users, dayOfWeek, startTime, endTime } = currentShow;

    return (
        <div>
            <h1 className="h1">
                {showName} with {renderUsers(users)} {'\u00A0'}
                ({dayOfWeek} from {humanReadableTime(startTime)} to {humanReadableTime(endTime)})
            </h1>
        </div>
    );
};

ShowHeader.propTypes = {
    currentShow: PropTypes.object
};

export default ShowHeader;
