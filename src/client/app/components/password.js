import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PasswordReset extends Component {
    state = {
        formSubmitted: false,
        value: ''
    }

    handleInputChange = (e) => this.setState(e.target.value);

    handleSubmit = () => {
        console.log(this.state.value)
        this.setState({ formSubmitted: true });
        // actuall submit the form
    }

    render () {
        const { value, formSubmitted } = this.state;

        return (
            <div>
                <div className="row">
                    <h1 className="flex-horizontal-center col col-md-12">Reset Password</h1>
                    <TextField
                        hintText="joan@theblackhearts.com"
                        value={value}
                        onChange={this.handleInputChange}
                    />
                    <RaisedButton
                        primary
                        label="Send"
                        onClick={this.handleSubmit}
                    />
                    {formSubmitted &&
                        <div>
                            <p>Check your inbox!</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
};

export default PasswordReset;
