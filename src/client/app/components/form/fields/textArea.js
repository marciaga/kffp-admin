import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { updateFormField } from '../../../actions/formActions';

export default class TextArea extends Component {
    constructor (props) {
        super(props);

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange (e) {
        const { value } = e.target;
        const { fieldName, handleChange } = this.props;

        handleChange ? handleChange(fieldName, value) : // eslint-disable-line
        this.props.dispatch(updateFormField(fieldName, value));
    }

    render () {
        const { id, name, label, value, hintText, disabled } = this.props;

        return (
            <TextField
                multiLine
                id={id}
                name={name}
                floatingLabelText={label}
                value={value || ''}
                hintText={hintText}
                onChange={this.handleTextFieldChange}
                type="textarea"
                disabled={disabled}
            />
        );
    }
}

TextArea.propTypes = {
    dispatch: PropTypes.func,
    handleChange: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    hintText: PropTypes.string,
    fieldName: PropTypes.string,
    disabled: PropTypes.bool
};
