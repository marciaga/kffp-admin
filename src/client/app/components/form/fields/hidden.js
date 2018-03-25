import React, { PropTypes } from 'react';

const Hidden = ({ value }) => (
    <input type="hidden" value={value} />
);

Hidden.propTypes = {
    value: PropTypes.any
};

export default Hidden;
