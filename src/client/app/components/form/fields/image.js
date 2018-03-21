import React, { PropTypes } from 'react';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const iconStyles = {
    display: 'inlineBlock',
    cursor: 'pointer'
};

const handleClick = (path) => {
    // use confirmation dialog to continue
    // dispatch action to delete the image from S3
    // dispatch action to remove from Redux store
};

const ThumbnailImage = ({ filePath }) => (
    <div>
        <img
            src={filePath}
            alt=""
            className="show-primary-image"
        />
        {filePath &&
            <ActionDelete
                style={iconStyles}
                hoverColor="grey"
                onClick={() => handleClick(filePath)}
            />
        }
    </div>
);

ThumbnailImage.propTypes = {
    filePath: PropTypes.string
};

export default ThumbnailImage;
