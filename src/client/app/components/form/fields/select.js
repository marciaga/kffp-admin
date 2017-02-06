import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { updateFormField } from '../../../actions/formActions';

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

export default Select;
