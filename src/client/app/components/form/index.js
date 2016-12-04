import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import FormFields from './fields';

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

    renderField (fieldName) {
        const FormField = FormFields[fieldName];

        if (FormField) {
            return (
                <FormField
                    key={cuid()}
                    label={fieldName}
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

        return (
            <form>
                { this.renderFormFields(form) }
            </form>
        );
    }
};

export default connect(mapStateToProps)(Form);
