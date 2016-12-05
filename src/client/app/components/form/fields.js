import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import AutoComplete from 'material-ui/AutoComplete';


const Text = ({ value, id, hintText, label }) => {
    return (
        <TextField
            id={id}
            name={name}
            floatingLabelText={label}
            value={value}
            hintText={hintText}
            type="text"
        />
    );
};

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

const ToggleField = ({ label, value }) => {
    const styles = {
        block: {
            maxWidth: 250
        }
    };

    return (
        <div style={styles.block}>
            <Toggle
              label={label}
              defaultToggled={false}
              onToggle={() => console.log('toggled')}
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
