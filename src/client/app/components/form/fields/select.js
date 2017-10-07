import React, { PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import { updateFormField } from '../../../actions/formActions';

const Select = ({ dispatch, fieldName, label, value, items, handleChange }) => {
    const renderItems = (list) => {
        if (list) {
            return list.map((item, i) => (
                <MenuItem key={i} value={item.value} primaryText={item.label} />
            ));
        }
    };

    const selectChangeHandler = (event, index, val) => handleChange ? // eslint-disable-line
        handleChange(fieldName, val) :
        dispatch(updateFormField(fieldName, val));

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

Select.propTypes = {
    dispatch: PropTypes.func,
    fieldName: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    items: PropTypes.array
};

export default Select;
