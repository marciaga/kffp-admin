import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
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
        const { show, playlist, dispatch } = this.props;
        const { playlists } = playlist;
        const { currentShow } = show;
        const { slug } = currentShow;
        const editUrl = slug ? `/playlists/edit/${slug}` : '';

        return (
            <div className="playlist-main">
                <div className="row">
                    <div className="col col-md-12 col-sm-12">
                        <ShowHeader currentShow={currentShow} />
                    </div>
                </div>
                <div className="row">
                    {/* Main Buttons */}
                    <ActionButtons
                        showId={currentShow._id}
                        slug={editUrl}
                        dispatch={dispatch}
                    />
                    {/* playlist history */}
                    <PlaylistHistory
                        dispatch={dispatch}
                        playlists={playlists}
                    />
                    <Divider />
                    {/* playlist edit section */}
                    <PlaylistForm />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Playlist);
