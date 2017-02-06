import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import { updateFormField } from '../../../actions/formActions';
import { hoursToDateObj } from '../../../utils/helperFunctions';

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

export default Time;
