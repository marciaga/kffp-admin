import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import { updateFormField } from '../../../actions/formActions';

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

ToggleField.propTypes = {
    dispatch: PropTypes.func,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
};

export default ToggleField;
