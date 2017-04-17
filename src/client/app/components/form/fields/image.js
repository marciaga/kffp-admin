import React, { PropTypes } from 'react';

const ThumbnailImage = ({ filePath }) => (
    <div>
        <img src={filePath} alt="" />
    </div>
);

ThumbnailImage.propTypes = {
    filePath: PropTypes.string
};

export default ThumbnailImage;
