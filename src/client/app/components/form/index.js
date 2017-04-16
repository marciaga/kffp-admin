import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { prepareFormSubmit, deleteForm } from '../../actions/formActions';
import * as FormFields from './fields';

const mapStateToProps = state => ({
    form: state.form,
    model: state.model
});

class Form extends Component {
    constructor (props) {
        super(props);

        this.renderField = this.renderField.bind(this);
        this.renderFormFields = this.renderFormFields.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    submitHandler (e) {
        e.preventDefault();
        const { formType, modelName } = this.props.form;
        // TODO perform validation
        this.props.dispatch(prepareFormSubmit(formType, modelName));
    }

    deleteHandler (id) {
        if (!window.confirm('Are you sure you want to delete this show?')) {
            return;
        }

        const { modelName } = this.props.form;

        this.props.dispatch(deleteForm(id, modelName));
    }

    renderFormFields (fields) {
        return Object.keys(fields).map((field, i) => (
            <div key={i}>
                {this.renderField(fields[field], field)}
            </div>
        ));
    }

    renderField (fieldData, fieldName) {
        const { dispatch } = this.props;
        const {
            fieldType,
            hintText,
            label,
            name,
            items,
            value,
            searchResults,
            disabled
        } = fieldData;
        const FormField = FormFields[fieldType];

        if (FormField) {
            return (
                <FormField
                    label={label}
                    hintText={hintText}
                    name={name}
                    id={`${name}_field`}
                    value={value}
                    fieldName={fieldName}
                    items={items}
                    searchResults={searchResults}
                    dispatch={dispatch}
                    disabled={disabled}
                />
            );
        }

        return (
            <div>No matching field.</div>
        );
    }

    renderErrors (errors) {
        if (errors.length) {
            return errors.map((err, i) => (
                <p key={i}>{err}</p>
            ));
        }
    }

    render () {
        const { fields, modelName, formType, data, errors } = this.props.form;
        const formTitle = `${formType} ${modelName} form`;

        return (
            <div>
                <h1>{formTitle}</h1>
                <div>
                    {this.renderErrors(errors)}
                </div>
                <form onSubmit={this.submitHandler}>
                    {this.renderFormFields(fields, data)}
                    <RaisedButton
                        label="delete"
                        type="button"
                        secondary={true}
                        disabled={formType === 'new'}
                        onClick={() => this.deleteHandler(fields._id.value)}
                    />
                    <RaisedButton
                        label="submit"
                        primary={true}
                        type="submit"
                    />
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    dispatch: PropTypes.func,
    fields: PropTypes.array,
    form: PropTypes.object,
    modelName: PropTypes.string,
    formType: PropTypes.string,
    data: PropTypes.object,
    errors: PropTypes.object
};

export default connect(mapStateToProps)(Form);
