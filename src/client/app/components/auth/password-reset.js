import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import { difference } from 'ramda';
import { handleResetPassword } from '../../actions/authActions';

const mapStateToProps = state => ({
    location: state.routing.locationBeforeTransitions
});

const validFields = ['password', 'passwordRepeated', 'token'];

class PasswordResetForm extends Component {
    state = {
        password: '',
        passwordRepeated: ''
    }

    componentDidMount () {
        const { pathname, query } = this.props.location;

        if (!query.token) {
            this.props.dispatch(push('/'));
        }

        this.setState({ ...this.state, token: query.token });
    }

    handleInputChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    submitForm = () => {
        const { password, passwordRepeated, token } = this.state;
        const keys = Object.keys(this.state);
        // this validity check doesnt work
        const isValid = difference(keys, validFields).length === 0;

        if (!isValid || password !== passwordRepeated) {
            return;
        }
        // submit the form
        this.props.dispatch(handleResetPassword({ password, token }));
        // show success message and direct them to log in with the new creds
    }

    render () {
        const { password, passwordRepeated } = this.state;

        return (
            <div className="row">
                <div className="col col-md-12 flex-horizontal-center">
                    <Card
                        style={{ minWidth: 600 }}
                        containerStyle={{ minWidth: 600 }}
                    >
                        <CardHeader title="Reset Your Password" />
                        <CardText>
                            <TextField
                                style={{ display: 'block' }}
                                value={password}
                                hintText="Enter New Password"
                                type="password"
                                name="password"
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                style={{ display: 'block' }}
                                value={passwordRepeated}
                                hintText="Enter New Password Again"
                                type="password"
                                name="passwordRepeated"
                                onChange={this.handleInputChange}
                            />
                            <RaisedButton
                                label="Submit"
                                onTouchTap={this.submitForm}
                            />
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PasswordResetForm);
