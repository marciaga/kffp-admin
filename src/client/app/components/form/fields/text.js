import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { updateFormField } from '../../../actions/formActions';

export default class Text extends Component {
    constructor (props) {
        super(props);

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange (e) {
        const textFieldName = this.props.fieldName;
        this.props.dispatch(updateFormField(textFieldName, e.target.value));
    }

    render () {
        const { id, name, label, value, hintText, fieldName, disabled } = this.props;
        const fieldType = fieldName === 'password' ? 'password' : 'text';

        return (
            <TextField
                id={id}
                name={name}
                floatingLabelText={label}
                value={value || ''}
                hintText={hintText}
                onChange={this.handleTextFieldChange}
                type={fieldType}
                disabled={disabled}
            />
        );
    }
}

Text.propTypes = {
    dispatch: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    hintText: PropTypes.string,
    fieldName: PropTypes.string,
    disabled: PropTypes.boolean
};
