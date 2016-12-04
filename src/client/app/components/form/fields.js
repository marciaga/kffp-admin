import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';

const Text = ({ value, id, hintText, label }) => {
    return (
        <TextField
            id={id}
            name={'changeme'}
            floatingLabelText={label}
            value={value || ''}
            hintText={hintText || ''}
            type={'text'}
        />
    );
};

const Password = ({ value, hintText, label }) => {
    return (
        <TextField
            value={value}
            hintText={hintText}
            floatingLabelText={label}
            type="password"
        />
    );
};

const ToggleField = ({ label, value }) => {
    return (
        <Toggle
          label="Simple"
          defaultToggled={false}
          onToggle={() => console.log('toggled')}
          style={{}}
        />
    );
};

const Time = ({ hintText, value }) => {
    return (
        <TimePicker
            format="ampm"
            hintText="Select a time"
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
                    <MenuItem value={item.value} primaryText={item.label} />
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

export default { Text, Password, ToggleField, Time, Select };
