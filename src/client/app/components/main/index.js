import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const mapStateToProps = state => ({
    auth: state.auth
});

class Main extends Component {
    componentDidMount () {
        const { auth, dispatch } = this.props;
        const { isAuthenticated } = auth;

        isAuthenticated && dispatch(push('/dashboard'));
    }

    render () {
        return (
            <div />
        );
    }
}

export default connect(mapStateToProps)(Main);
