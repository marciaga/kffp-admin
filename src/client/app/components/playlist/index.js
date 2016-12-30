import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getShowPlaylists } from '../../actions/playlistActions';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        routing: state.routing
    };
};

class Playlist extends Component {
    constructor (props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { auth, routing } = nextProps;
        const { user } = auth;
        const { locationBeforeTransitions } = routing;
        const { pathname } = locationBeforeTransitions;

        if (this.props.auth.user !== user && pathname) {
            this.props.dispatch(getShowPlaylists(pathname));
        }
    }

    render () {
        return (
            <div>
                <h1></h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Playlist);
