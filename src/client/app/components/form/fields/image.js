import React, { PropTypes } from 'react';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { fileRemove } from '../../../actions/formActions';

const iconStyles = {
    display: 'inlineBlock',
    cursor: 'pointer'
};

const handleClick = (path, dispatch, fieldName) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
        return;
    }

    return dispatch(fileRemove(path, fieldName));
};

const ThumbnailImage = ({ filePath, dispatch, fieldName }) => (
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
                onClick={() => handleClick(filePath, dispatch, fieldName)}
            />
        }
    </div>
);

ThumbnailImage.propTypes = {
    dispatch: PropTypes.func,
    fieldName: PropTypes.string,
    filePath: PropTypes.string
};

export default ThumbnailImage;
