import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { UserList } from './list';
import { getUsers } from '../../actions/userActions';

const mapStateToProps = (state) => {
    return {
        users: state.users.userList,
        isAuthenticated: state.login.isAuthenticated,
        user: state.login.user
    };
};

class UserContainer extends Component {
    constructor (props) {
        super(props);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user.scope !== 'admin') {
            return browserHistory.push('/');
        }
        // this exectutes once
        if (nextProps.users === this.props.users) {
            // dispatch an action to fetch all users
            this.props.dispatch(getUsers(nextProps.user));
        }
    }

    render () {
        const { users } = this.props;

        return (
            <UserList users={users}/>
        );
    }
};

export default connect(mapStateToProps)(UserContainer);
