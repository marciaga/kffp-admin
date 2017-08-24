import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { updateFormField } from '../../../actions/formActions';

export default class TextArea extends Component {
    constructor (props) {
        super(props);

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange (e) {
        const textFieldName = this.props.fieldName;
        this.props.dispatch(updateFormField(textFieldName, e.target.value));
    }

    render () {
        const { id, name, label, value, hintText, disabled } = this.props;

        return (
            <TextField
                id={id}
                name={name}
                multiLine={true}
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
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    hintText: PropTypes.string,
    fieldName: PropTypes.string,
    disabled: PropTypes.bool
};
