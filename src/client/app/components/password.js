import React, { Component, PropTypes } from 'react';
import { allPass, isEmpty } from 'ramda';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { isValidEmail } from '../utils/helperFunctions';
import { sendPasswordReset } from '../actions/authActions';

const isSubmittable = allPass([
    t => !isEmpty(t),
    isValidEmail
]);

class PasswordReset extends Component {
    state = {
        formSubmitted: false,
        value: ''
    }

    handleInputChange = (e) => this.setState({ value: e.target.value });

    handleSubmit = () => {
        const { value } = this.state;

        if (isSubmittable(value)) {
            this.setState({ formSubmitted: true });
            // actually submit the form
            this.props.dispatch(sendPasswordReset(value));
        }
    }

    render () {
        const { value, formSubmitted } = this.state;

        return (
            <div>
                {!formSubmitted &&
                <div>
                    <TextField
                        hintText="joan@theblackhearts.com"
                        value={value}
                        onChange={this.handleInputChange}
                    />
                    <RaisedButton
                        style={{ marginLeft: '10px' }}
                        primary
                        label="Send"
                        onClick={this.handleSubmit}
                    />
                </div>
                }
                {formSubmitted &&
                    <div>
                        <p>Check your inbox!</p>
                    </div>
                }
            </div>
        );
    }
};

export default PasswordReset;
