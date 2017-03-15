import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    constructor (props) {
        super(props);

        this.isEditPath = this.isEditPath.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { auth, routing } = nextProps;
        const { user } = auth;
        const { locationBeforeTransitions } = routing;
        const { pathname } = locationBeforeTransitions;

        if (this.props.auth.user !== user && pathname) {
            this.props.dispatch(getShowPlaylists(pathname));
        }
    }

    isEditPath (path) {
        const ri = new RegExp('edit', 'i');

        return ri.test(path);
    }

    render () {
        const { show, playlist, dispatch, route, routeParams } = this.props;
        const { playlists } = playlist;
        const { currentShow } = show;
        const { path } = route;
        const { slug } = currentShow;
        
        console.log(routeParams);

        return (
            <div className="playlist-main">
                <div className="row">
                    <div className="flex-horizontal-center col col-md-12 col-sm-12">
                        <ShowHeader currentShow={currentShow} />
                    </div>
                </div>
                <div className="row">
                    <ActionButtons
                        showId={currentShow._id}
                        dispatch={dispatch}
                    />

                    <PlaylistHistory
                        dispatch={dispatch}
                        playlists={playlists}
                    />

                    <PlaylistForm isEditPath={this.isEditPath(path)} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Playlist);
