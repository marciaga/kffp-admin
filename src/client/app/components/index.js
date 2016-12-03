import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar } from './navbar';
import { verifyLogin } from '../actions/authActions';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

class App extends Component {
    constructor (props) {
        super(props);

        props.dispatch(verifyLogin(
            props.auth.isAuthenticated
        ));
    }

    render () {
        const { dispatch, auth } = this.props;
        const { isAuthenticated, errorMessage } = auth;

        return (
            <div>
                <Navbar isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} />
                {isAuthenticated &&
                    <div>
                        {this.props.children}
                    </div>
                }
            </div>
        )
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(App);
