import React, { Component, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Radio extends Component {
    static propTypes = {
        fields: PropTypes.array,
        name: PropTypes.string
    }

    handleChange = (e, value) => {
        console.log(value);
    }

    render () {
        const { name, fields } = this.props;

        return (
            <RadioButtonGroup
                onChange={this.handleChange}
                name={name}
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
