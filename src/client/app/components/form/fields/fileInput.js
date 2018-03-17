import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { fileUpload } from '../../../actions/formActions';
import ThumbnailImage from './image';


class FileInput extends Component {
    static propTypes = {
        label: PropTypes.string,
        dispatch: PropTypes.func,
        value: PropTypes.string
    };

    state = {
        error: ''
    }

    handleInputChange = (e) => {
        const { files } = e.target;
        const formData = new FormData();

        // nothing larger than 1.2MB
        if (files[0] && files[0].size > 1200000) {
            return this.setState({ error: 'file must be less than 1.2MB' });
        }

        formData.append('file', files[0]);

        this.setState({ error: '' });

        dispatch(fileUpload(formData, fieldName));
    };

    render () {
        const { label, value, fieldName, dispatch } = this.props;
        const { error } = this.state;

       return (
            <div>
                <RaisedButton
                    containerElement="label"
                    label={label}
                >
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={this.handleInputChange}
                    />
                </RaisedButton>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ThumbnailImage filePath={value} />
            </div>
        );
    }
}

export default FileInput;
