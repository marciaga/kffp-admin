import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { UserList } from './list';
import { getUsers } from '../../actions/usersActions';

const mapStateToProps = (state) => {
    return {
        users: state.users,
        auth: state.auth
    };
};

class UserContainer extends Component {
    constructor (props) {
        super(props);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.auth.user !== nextProps.auth.user) {
            if (nextProps.auth.user.scope !== 'admin') {
                return browserHistory.push('/');
            }
            // dispatch an action to fetch all users
            this.props.dispatch(getUsers(nextProps.auth.user));
        }
    }

    render () {
        const { users, auth } = this.props;
        const { isAuthenticated, user } = auth;
        const { userList } = users;
        const isAdmin = user && user.scope === 'admin';

        return (
            <div>
                {isAuthenticated && isAdmin &&
                    <UserList users={userList} />
                }
            </div>
        );
    }
};

export default connect(mapStateToProps)(UserContainer);
