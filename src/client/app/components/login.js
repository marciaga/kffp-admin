import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const { email, password } = this;
        const credentials = {
            email: email.value.trim(),
            password: password.value.trim()
        };

        this.props.onLoginClick(credentials);
    }

    render () {
        const { errorMessage } = this.props;

        return (
            <div>
                <input type="text" ref={(c) => { this.email = c; }} placeholder="Email" />
                <input type="password" ref={(p) => { this.password = p; }} placeholder="Password" />
                <RaisedButton onClick={e => this.handleClick(e)} label="Login" />

                {errorMessage &&
                    <p>{errorMessage}</p>
                }
            </div>
        );
    }
}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default Login;
