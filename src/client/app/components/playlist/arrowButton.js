import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

const directionMap = {
    up: () => <ArrowDropUp />,
    down: () => <ArrowDropDown />
};

const ArrowButton = ({ direction, clickHandler, id }) => (
    <IconButton
        onClick={() => clickHandler(direction, id)}
        tooltip={`Move song ${direction}`}
    >
        {directionMap[direction]()}
    </IconButton>
);

ArrowButton.propTypes = {
    direction: PropTypes.string,
    clickHandler: PropTypes.func,
    id: PropTypes.string
};

export default ArrowButton;
