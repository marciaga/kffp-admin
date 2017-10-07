import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Radio from '../form/fields/radio';
import Select from '../form/fields/select';
import TextArea from '../form/fields/textArea';
import {
    selectableHours,
    volunteerCategoryFields,
    volunteerTypeFields
} from './static-fields';
import {
    updateField,
    volunteerFormSubmit
} from '../../actions/volunteerActions';

const requiredFields = ['date', 'type', 'category', 'hours', 'userId'];
const mapStateToProps = state => ({
    volunteer: state.volunteer,
    user: state.auth.user
});

class VolunteerForm extends Component {
    static propTypes = {
        category: PropTypes.string,
        comments: PropTypes.string,
        date: PropTypes.string,
        dispatch: PropTypes.func,
        hours: PropTypes.number,
        type: PropTypes.string,
        user: PropTypes.object,
        volunteer: PropTypes.object
    }

    handleSubmit = () => {
        const { dispatch, volunteer, user } = this.props;
        const {
            date,
            type,
            category,
            hours,
            comments
        } = volunteer;
        const formData = {
            date,
            type,
            category,
            hours,
            comments,
            userId: user.id
        };

        const fields = Object.keys(formData)
            .filter(f => R.contains(f, requiredFields) && formData[f]);

        const submitForm = R.ifElse(
            R.equals,
            () => dispatch(volunteerFormSubmit(formData)),
            () => null
        );

        submitForm(fields.length, requiredFields.length);
    }

    render () {
        const { dispatch, volunteer } = this.props;
        const {
            category,
            type,
            hours,
            comments
        } = volunteer;

        return (
            <div>
                <h1>Volunteer Hours Tracking Form</h1>
                <Radio
                    name="category"
                    fields={volunteerCategoryFields}
                    handleChange={(n, v) => dispatch(updateField(n, v))}
                    category={category}
                />
                <DatePicker
                    hintText="I volunteered on..."
                    onChange={(n, v) => dispatch(updateField('date', v))}
                />
                <Select
                    label="I'm tracking hours for..."
                    items={volunteerTypeFields}
                    value={type}
                    handleChange={(n, v) => dispatch(updateField('type', v))}
                />
                <Select
                    label="Hours spent..."
                    items={selectableHours}
                    value={hours}
                    handleChange={(n, v) => dispatch(updateField('hours', v))}
                />
                <TextArea
                    name="optionalcomments"
                    id="optional-comments"
                    label="Comments"
                    hintText="I also did..."
                    value={comments}
                    handleChange={(n, v) => dispatch(updateField('comments', v))}
                />
                <RaisedButton
                    primary
                    label="Submit"
                    onClick={this.handleSubmit}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(VolunteerForm);
