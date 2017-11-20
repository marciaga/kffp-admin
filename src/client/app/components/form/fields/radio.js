import React, { Component, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Radio extends Component {
    static propTypes = {
        category: PropTypes.string,
        fields: PropTypes.array,
        handleChange: PropTypes.func,
        name: PropTypes.string
    }

    handleSelection = (e, value) => {
        const { handleChange, name } = this.props;

        return handleChange(name, value);
    }

    render () {
        const { name, fields, category } = this.props;

        return (
            <RadioButtonGroup
                onChange={this.handleSelection}
                name={name}
                valueSelected={category}
            >
                {fields.length && fields.map((field, i) => (
                    <RadioButton
                        key={`${field.label}_${i}`}
                        label={field.label}
                        value={field.value}
                    />
                ))}
            </RadioButtonGroup>
        );
    }
}

export default Radio;
