import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import FormFields from './fields';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = (state) => {
    return {
        form: state.form,
        model: state.model
    }
};

class Form extends Component {
    constructor (props) {
        super(props);

        this.renderField = this.renderField.bind(this);
        this.renderFormFields = this.renderFormFields.bind(this);
    }

    renderField (fieldData, fieldName) {
        const { dispatch } = this.props;

        const { fieldType, hintText, label, name, items, value } = fieldData;
        const FormField = FormFields[fieldType];

        if (FormField) {
            return (
                <FormField
                    key={cuid()}
                    label={label}
                    hintText={hintText}
                    name={name}
                    id={cuid()}
                    value={value}
                    fieldName={fieldName}
                    items={items}
                    dispatch={dispatch}
                />
            );
        } else {
            return (
                <div>No matching field.</div>
            );
        }
    }

    renderFormFields (fields) {
        return Object.keys(fields).map(field => {
            return this.renderField(fields[field], field);
        });
    }

    render () {
        const { fields, modelName, formType, data } = this.props.form;
        const formTitle = `${formType} ${modelName} form`;

        return (
            <div>
                <h1>{formTitle}</h1>
                <form>
                    { this.renderFormFields(fields, data) }
                    <RaisedButton
                        label="submit"
                        primary={true}
                    />
                </form>
            </div>
        );
    }
};

export default connect(mapStateToProps)(Form);
