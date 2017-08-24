import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import PlaylistHistory from './list';
import ShowHeader from './header';
import PlaylistForm from './playlistForm';
import ActionButtons from './actionButtons';
import { getShowPlaylists } from '../../actions/playlistActions';

const mapStateToProps = state => ({
    auth: state.auth,
    routing: state.routing,
    show: state.show,
    playlist: state.playlist
});

class Playlist extends Component {
    componentWillReceiveProps (nextProps) {
        const { auth, routing } = nextProps;
        const { user } = auth;
        const { locationBeforeTransitions } = routing;
        const { pathname } = locationBeforeTransitions;

        if (this.props.auth.user !== user && pathname) {
            this.props.dispatch(getShowPlaylists(pathname));
        }
    }

    render () {
        const { show, playlist, dispatch, auth } = this.props;
        const { playlists } = playlist;
        const { currentShow } = show;
        const currentUserName = R.pathOr('', ['user', 'displayName'], auth);
        const currentShowDJs = R.pathOr([], ['users'], currentShow);

        return (
            <div className="playlist-main">
                <div className="row">
                    <div className="flex-horizontal-center col col-md-12 col-sm-12">
                        <ShowHeader currentShow={currentShow} />
                    </div>
                </div>
                <div className="row">
                    <ActionButtons
                        currentUserName={currentUserName}
                        currentShowDJs={currentShowDJs}
                        showId={currentShow._id}
                        slug={currentShow.slug}
                        dispatch={dispatch}
                    />

                    <PlaylistHistory
                        dispatch={dispatch}
                        playlist={playlist}
                        playlists={playlists}
                    />

                    <PlaylistForm />
                </div>
            </div>
        );
    }
}

Playlist.propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    routing: PropTypes.object,
    show: PropTypes.object,
    playlist: PropTypes.object
};

export default connect(mapStateToProps)(Playlist);
