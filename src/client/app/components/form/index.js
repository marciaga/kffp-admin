import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ConfirmationDialog from '../feedback/confirm';
import {
    prepareFormSubmit,
    deleteForm,
    resetUserPassword
} from '../../actions/formActions';
import { TOGGLE_MODAL } from '../../constants';
import { confirmOpen } from '../../actions/feedbackActions';
import * as FormFields from './fields';

const mapStateToProps = state => ({
    form: state.form,
    model: state.model,
    feedback: state.feedback
});

class Form extends Component {
    constructor (props) {
        super(props);

        this.handlePasswordReset = this.handlePasswordReset.bind(this);
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
        return this.props.dispatch(confirmOpen(true, id));
    }

    handlePasswordReset (id) {
        if (window && !window.confirm('Are you sure you want to reset that?')) {
            return;
        }

        this.props.dispatch({
            type: TOGGLE_MODAL,
            data: {
                showModal: false
            }
        });

        return this.props.dispatch(resetUserPassword(id));
    }

    renderFormFields (fields, data, validationErrors) {
        return Object.keys(fields).map((field, i) => {
            let error = '';

            if (validationErrors && validationErrors.length) {
                const errorFound = validationErrors.find(o => o[field]);

                error = errorFound ? errorFound[field] : '';
            }

            return (
                <div key={i}>
                    {this.renderField(fields[field], field, error)}
                </div>
            );
        });
    }

    renderField (fieldData, fieldName, error) {
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
                    error={error}
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
        const { dispatch, form, feedback } = this.props;
        const {
            fields,
            modelName,
            formType,
            data,
            errors,
            validationErrors
        } = form;
        const { confirmDialog } = feedback;
        const { open, info } = confirmDialog;
        const formTitle = `${formType} ${modelName} form`;

        return (
            <div>
                <h1>{formTitle}</h1>
                <div>
                    {this.renderErrors(errors)}
                </div>
                <form onSubmit={this.submitHandler}>
                    {this.renderFormFields(fields, data, validationErrors)}
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
                { modelName === 'users' &&
                    <RaisedButton
                        backgroundColor="red"
                        label="Reset Password"
                        labelColor="white"
                        onClick={() => this.handlePasswordReset(fields._id.value)}
                        style={{ marginTop: 30 }}
                    />
                }
                <ConfirmationDialog
                    title="Are you sure you want to delete this?"
                    open={open}
                    cancelHandler={() => dispatch(confirmOpen(false, null))}
                    okHandler={() => dispatch(deleteForm(info, modelName))}
                />
            </div>
        );
    }
}

Form.propTypes = {
    dispatch: PropTypes.func,
    form: PropTypes.object,
    modelName: PropTypes.string,
    formType: PropTypes.string,
    feedback: PropTypes.object
};

export default connect(mapStateToProps)(Form);
