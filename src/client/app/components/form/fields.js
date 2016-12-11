import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import AutoComplete from 'material-ui/AutoComplete';
import cuid from 'cuid';
import { updateFormField } from '../../actions/formActions';
import { FORM_FIELD_DEBOUNCE_TIME } from '../../utils/constants';
import { debounce } from '../../utils/helperFunctions';

class Text extends Component {
    constructor (props) {
        super(props);

        this.debounceTextField = debounce(this.debounceTextField, FORM_FIELD_DEBOUNCE_TIME);
    }

    handleTextFieldChange (e) {
        const textFieldName = this.props.fieldName;
        this.debounceTextField(e.target.value, textFieldName);
    }

    debounceTextField (value, fieldName) {
        this.props.dispatch(updateFormField(fieldName, value));
    }

    render () {
        const { id, name, label, value, hintText, fieldName } = this.props;

        return (
            <TextField
                id={id}
                name={name}
                floatingLabelText={label}
                value={value}
                hintText={hintText}
                type="text"
                onChange={this.handleTextFieldChange.bind(this)}
            />
        )
    }
}

const Password = ({ id, value, hintText, label }) => {
    return (
        <TextField
            id={id}
            value={value}
            hintText={hintText}
            floatingLabelText={label}
            type="password"
        />
    );
};

const ToggleField = ({ dispatch, fieldName, label, value }) => {
    const styles = {
        block: {
            maxWidth: 250
        }
    };
    const handleToggle = () => {
        const toggledValue = !value;

        dispatch(updateFormField(fieldName, toggledValue ));
    };

    return (
        <div style={styles.block}>
            <Toggle
              label={label}
              defaultToggled={value}
              onToggle={handleToggle}
              style={{}}
            />
        </div>
    );
};

const Time = ({ hintText, value }) => {
    return (
        <TimePicker
            format="ampm"
            hintText={hintText}
            value={{}}
            onChange={() => console.log('time picker')}
        />
    );
};

const Select = ({ label, value, items }) => {
    const renderItems = (list) => {
        if (list) {

            return list.map(item => {
                return (
                    <MenuItem key={cuid()} value={item.value} primaryText={item.label} />
                );
            });
        }
    };

    return (
        <SelectField
            floatingLabelText={label}
            value={value}
            onChange={() => console.log('y')}
        >
            { renderItems(items) }
        </SelectField>
    );
};

const AutoCompleteField = ({ hintText, label }) => {
    return (
        <AutoComplete
            hintText={hintText}
            dataSource={[]}
            onUpdateInput={() => console.log('autocomplete')}
            floatingLabelText={label}
        />
    );
};

export default { Text, Password, ToggleField, Time, Select, AutoCompleteField };
