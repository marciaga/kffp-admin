import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import { loginInputChange } from '../actions/authActions';

const mapStateToProps = state => ({
    auth: state.auth
});

class Login extends Component {
    constructor (props) {
        super(props);

        this.handleInputUpdate = this.handleInputUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputUpdate (e, text) {
        const fieldName = e.target.name;

        this.props.dispatch(loginInputChange({ text, fieldName }));
    }

    handleSubmit (e) {
        e.preventDefault();

        const { loginForm } = this.props.auth;
        const { email, password } = loginForm;

        if (!email || !password) {
            return;
        }

        const credentials = {
            email: email.trim(),
            password: password.trim()
        };

        this.props.onLoginClick(credentials);
    }

    render () {
        // TODO @ma - improve the error handling
        const { errorMessage } = this.props;
        const styles = {
            wrapperStyle: {
                marginRight: '10px'
            },
            inputStyles: {
                color: white
            },
            underlineStyle: {
                borderColor: white
            },
            hintStyle: {
                color: white
            },
            underlineFocusStyle: {
                color: '#006064'
            }
        };

        return (
            <form>
                <TextField
                    onChange={this.handleInputUpdate}
                    type="text"
                    hintText="Email"
                    name="email"
                    errorText={errorMessage}
                    style={styles.wrapperStyle}
                    inputStyle={styles.inputStyles}
                    hintStyle={styles.hintStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    underlineStyle={styles.underlineStyle}
                />
                <TextField
                    onChange={this.handleInputUpdate}
                    type="password"
                    name="password"
                    hintText="Password"
                    errorText={errorMessage}
                    style={styles.wrapperStyle}
                    inputStyle={styles.inputColor}
                    hintStyle={styles.hintStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    underlineStyle={styles.underlineStyle}
                />
                <RaisedButton
                    onClick={e => this.handleSubmit(e)}
                    type="submit"
                    style={styles.wrapperStyle}
                    label="Login"
                />
            </form>
        );
    }
}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default connect(mapStateToProps)(Login);
