import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { updateFormField } from '../../../actions/formActions';

class MultiSelect extends Component {
    static propTypes = {
        autoWidth: PropTypes.bool,
        dispatch: PropTypes.func,
        fieldName: PropTypes.string,
        handleChange: PropTypes.func,
        label: PropTypes.string,
        value: PropTypes.any,
        items: PropTypes.array
    }

    handleChange = (event, index, values) => {
        this.props.dispatch(updateFormField(
            this.props.fieldName,
            values
        ));
    }

    getValueFromItems = (v, item) => {
        if (!v.length) {
            return false;
        }

        const result = v.find(l => l === item.value);

        return !!result || false;
    }

    menuItems(value = [], items) {
        return items.map((item, i) => {
            const isChecked = this.getValueFromItems(value, item);

            return (
                <MenuItem
                    insetChildren
                    key={i}
                    checked={isChecked}
                    value={item.value}
                    primaryText={item.label}
                />
            );
        })
    }

    render() {
        const { label, value, items, handleChange, autoWidth } = this.props;

        return (
            <SelectField
                multiple
                autoWidth={autoWidth}
                hintText={label}
                value={value}
                onChange={this.handleChange}
                >
                {this.menuItems(value, items)}
            </SelectField>
        );
    }
}

export default MultiSelect;
