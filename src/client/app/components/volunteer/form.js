import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { Card, CardText, CardActions } from 'material-ui/Card';
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

const requiredFields = ['date', 'type', 'category', 'hours', 'comments', 'userId'];
const mapStateToProps = state => ({
    volunteer: state.volunteer,
    user: state.auth.user
});

class VolunteerForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            showError: false,
            message: 'All Fields Are Required...'
        }
    }
    static propTypes = {
        dispatch: PropTypes.func,
        user: PropTypes.object,
        volunteer: PropTypes.object
    }

    handleValidationFail = () => {
        this.setState({ showError: true });
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
            () => {
                this.setState({ showError: false });
                dispatch(volunteerFormSubmit(formData));
            },
            () => this.handleValidationFail()
        );

        submitForm(fields.length, requiredFields.length);
    }

    render () {
        const { showError, message } = this.state;
        const { dispatch, volunteer } = this.props;
        const {
            category,
            type,
            hours,
            comments
        } = volunteer;

        return (
            <div className="row">
                <h1 className="page-heading">Volunteer Hours Tracking Form</h1>
                <div className="col col-md-12 flex-horizontal-center">
                    <Card
                        style={{ minWidth: 600 }}
                        containerStyle={{ minWidth: 600 }}
                    >
                        <CardText>
                            <span>I am a... (select one)</span>
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
                            <div>
                                <Select
                                    label="I'm tracking hours for..."
                                    items={volunteerTypeFields}
                                    value={type}
                                    handleChange={(n, v) => dispatch(updateField('type', v))}
                                    autoWidth
                                />
                            </div>
                            <div>
                                <Select
                                    label="Hours spent..."
                                    items={selectableHours}
                                    value={hours}
                                    handleChange={(n, v) => dispatch(updateField('hours', v))}
                                    autoWidth
                                />
                            </div>
                            <TextArea
                                name="optionalcomments"
                                id="optional-comments"
                                label="Describe what you did"
                                hintText="I did..."
                                value={comments}
                                handleChange={(n, v) => dispatch(updateField('comments', v))}
                            />
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                primary
                                label="Submit"
                                onClick={this.handleSubmit}
                            />
                        {showError && <h2 style={{ color: 'red' }}>{message}</h2>}
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(VolunteerForm);
