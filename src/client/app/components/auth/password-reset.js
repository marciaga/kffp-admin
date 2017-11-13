import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import { where, isEmpty } from 'ramda';
import { handleResetPassword } from '../../actions/authActions';

const mapStateToProps = state => ({
    location: state.routing.locationBeforeTransitions,
    passwordUpdated: state.auth.passwordUpdated
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

        const hasEmptyValues = where({
            password: isEmpty,
            passwordRepeated: isEmpty,
        });

        if (hasEmptyValues(this.state) || password !== passwordRepeated) {
            return;
        }

        this.props.dispatch(handleResetPassword({ password, token }));
    }

    render () {
        const { passwordUpdated } = this.props;
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
                            {!passwordUpdated &&
                                <div>
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
                                </div>
                            }
                            {passwordUpdated &&
                                <div>
                                    Password updated successfully. Please log in with your new credentials.
                                </div>
                            }
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PasswordResetForm);
