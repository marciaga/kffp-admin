import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Radio from '../form/fields/radio';
import Select from '../form/fields/select';
import TextArea from '../form/fields/textArea';

/*
Monthly All-Station Meeting
Substitute DJ (provide DJ or show and date/time in Comments)
Events Committee
Music Library Committee
Operations Committee
Social Media Committee
Underwriting Committee
Volunteer Committee
Web Committee
Zine Committee
Freeform Portland Blog
Station Beautification
On-Call Sub Team (OCS)
Other (provide details in Comments):
*/
const volunteerTypeFields = [
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    }

];
const volunteerCategoryFields = [
    {
        label: 'A KFFP DJ with a weekly/bi-weekly time slot',
        value: 'dj'
    },
    {
        label: 'A KFFP Trained Substitute DJ',
        value: 'sub'
    },
    {
        label: 'An Awesome Volunteer at Large',
        value: 'volunteer'
    }
];

const hours = Array(100)
    .fill(0)
    .map((o, i) => ({
        label: i + 1,
        value: i + 1
    }));

const mapStateToProps = state => ({

});

class VolunteerForm extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    handleSubmit = () => {

    }

    render () {
        const { dispatch } = this.props;

        return (
            <div>
                <h1>VolunteerForm</h1>
                <Radio
                    name="volunteer-category"
                    fields={volunteerCategoryFields}
                    dispatch={dispatch}
                />
                <DatePicker
                    hintText="I volunteered on..."
                />
                <Select
                    label="I'm tracking hours for..."
                    items={volunteerTypeFields}
                    dispatch={dispatch}
                />
                <Select
                    label="Hours spent..."
                    items={hours}
                    dispatch={dispatch}
                />
                <TextArea
                    name="optionalcomments"
                    id="optional-comments"
                    label="Comments"
                    hintText="I also did..."
                    dispatch={dispatch}
                />
                <RaisedButton
                    primary
                    label="Submit"
                    onClick={() => console.log('submit')}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(VolunteerForm);
