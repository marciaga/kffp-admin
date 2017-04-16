import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { fileUpload } from '../../../actions/formActions';


const FileInput = ({ label, dispatch }) => {
    const handleInputChange = (e) => {
        const formData = new FormData();

        formData.append('file', e.target.files[0]);

        dispatch(fileUpload(formData));
    };

    return (
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
    );
};

FileInput.propTypes = {
    label: PropTypes.string,
    dispatch: PropTypes.func
};

export default FileInput;
