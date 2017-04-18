import React, { PropTypes } from 'react';

const ThumbnailImage = ({ filePath }) => (
    <div>
        <img
            src={filePath}
            alt=""
            className="show-primary-image"
        />
    </div>
);

ThumbnailImage.propTypes = {
    filePath: PropTypes.string
};

export default ThumbnailImage;
