import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Album from 'material-ui/svg-icons/av/album';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import AutoComplete from 'material-ui/AutoComplete';
import { updateFormField, getUserAutoComplete, addUsersToShow } from '../../actions/formActions';
import { FORM_FIELD_DEBOUNCE_TIME } from '../../utils/constants';
import { debounce, hoursToDateObj } from '../../utils/helperFunctions';

class Text extends Component {
    constructor (props) {
        super(props);

        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange (e) {
        const textFieldName = this.props.fieldName;
        this.props.dispatch(updateFormField(textFieldName, e.target.value));
    }

    render () {
        const {
            id,
            name,
            label,
            value,
            hintText,
            disabled
        } = this.props;

        return (
            <TextField
                id={id}
                name={name}
                floatingLabelText={label}
                value={value || ''}
                hintText={hintText}
                onChange={this.handleTextFieldChange}
                type={name}
                disabled={disabled}
            />
        );
    }
}

const Hidden = ({ value }) => (
    <input type="hidden" value={value} />
);

const ToggleField = ({ dispatch, fieldName, label, value }) => {
    const styles = {
        block: {
            maxWidth: 250
        }
    };
    const handleToggle = () => {
        const toggledValue = !value;

        dispatch(updateFormField(fieldName, toggledValue));
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

const Time = ({ dispatch, fieldName, hintText, value }) => {
    const handleTimePickerChange = (e, date) => {
        const selectedHours = date.getHours();

        dispatch(updateFormField(fieldName, selectedHours));
    };

    const val = hoursToDateObj(value);
    return (
        <TimePicker
            format="ampm"
            hintText={hintText}
            value={val}
            onChange={handleTimePickerChange}
        />
    );
};

const Select = ({ dispatch, fieldName, label, value, items }) => {
    const renderItems = (list) => {
        if (list) {
            return list.map((item, i) => (
                <MenuItem key={i} value={item.value} primaryText={item.label} />
            ));
        }
    };

    const selectChangeHandler = (event, index, val) => {
        dispatch(updateFormField(fieldName, val));
    };

    return (
        <SelectField
            floatingLabelText={label}
            value={value}
            onChange={selectChangeHandler}
        >
            { renderItems(items) }
        </SelectField>
    );
};

class AutoCompleteField extends Component {
    constructor (props) {
        super(props);

        this.debounceInputField = debounce(this.debounceInputField, FORM_FIELD_DEBOUNCE_TIME);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderAutocompleteItems = this.renderAutocompleteItems.bind(this);
    }

    debounceInputField (value) {
        this.props.dispatch(getUserAutoComplete(value));
    }

    handleInputUpdate (text) {
        this.debounceInputField(text);
    }

    handleSelection (selected) {
        if (selected) {
            this.props.dispatch(addUsersToShow(selected.text));
        }
    }

    renderAutocompleteItems (results) {
        if (!results) {
            return [];
        }

        return results.map((r) => {
            const itemText = `${r.displayName} | ${r.email}`;

            return {
                text: r.displayName,
                value: (
                    <MenuItem primaryText={itemText} />
                )
            };
        });
    }

    renderListItems (items) {
        if (!items) {
            return [];
        }

        return items.map((item, i) => (
            <ListItem
                key={i}
                primaryText={item}
                leftIcon={<Album />}
            />
        ));
    }

    render () {
        const { hintText, label, searchResults, value } = this.props;
        const dataSource = this.renderAutocompleteItems(searchResults);

        return (
            <div>
                <div>
                    <AutoComplete
                        hintText={hintText}
                        dataSource={dataSource}
                        filter={AutoComplete.noFilter}
                        onNewRequest={this.handleSelection}
                        onUpdateInput={this.handleInputUpdate}
                        floatingLabelText={label}
                        fullWidth={true}
                    />
                </div>
                <div>
                    <p style={{ marginBottom: 0 }}>DJ(s) Assigned to This Show:</p>
                    <List>
                        {this.renderListItems(value)}
                    </List>
                </div>
            </div>
        );
    }
}

export default {
    Text,
    ToggleField,
    Time,
    Select,
    AutoCompleteField,
    Hidden
};
