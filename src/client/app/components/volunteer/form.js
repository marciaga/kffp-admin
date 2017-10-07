import React, { Component, PropTypes } from 'react';
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

const mapStateToProps = state => ({
    volunteer: state.volunteer,
    user: state.auth.user
});

class VolunteerForm extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        volunteer: PropTypes.object
    }

    handleSubmit = () => {
        const { dispatch } = this.props;
        // if all values are present...
        dispatch(volunteerFormSubmit());
    }

    render () {
        const { dispatch, volunteer } = this.props;
        const {
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
