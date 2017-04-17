import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { fileUpload } from '../../../actions/formActions';
import ThumbnailImage from './image';


const FileInput = ({ label, value, dispatch }) => {
    const handleInputChange = (e) => {
        const formData = new FormData();

        formData.append('file', e.target.files[0]);

        dispatch(fileUpload(formData));
    };

    return (
        <div>
            <RaisedButton
                containerElement="label"
                label={label}
            >
                <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                />
            </RaisedButton>
            <ThumbnailImage filePath={value} />
        </div>
    );
};

FileInput.propTypes = {
    label: PropTypes.string,
    dispatch: PropTypes.func,
    value: PropTypes.string
};

export default FileInput;
