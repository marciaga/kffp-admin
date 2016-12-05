import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import FormFields from './fields';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = (state) => {
    return {
        form: state.form
    }
};

class Form extends Component {
    constructor (props) {
        super(props);

        this.renderField = this.renderField.bind(this);
        this.renderFormFields = this.renderFormFields.bind(this);
    }

    renderField (fieldData) {
        const { fieldType, hintText, label, name } = fieldData;
        const FormField = FormFields[fieldType];

        if (FormField) {
            return (
                <FormField
                    key={cuid()}
                    label={label}
                    hintText={hintText}
                    name={name}
                    id={cuid()}
                />
            );
        } else {
            return (
                <div>No matching field.</div>
            );
        }
    }

    renderFormFields (form) {
        const { fields } = form;

        return Object.keys(fields).map(field => {
            return this.renderField(fields[field]);
        });
    }

    render () {
        const { form } = this.props;
        const { model, type } = form;
        const formTitle = `${type} ${model} form`;

        return (
            <div>
                <h1>{formTitle}</h1>
                <form>
                    { this.renderFormFields(form) }
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
