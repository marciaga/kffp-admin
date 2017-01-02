import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { PlaylistHistory } from './list';
import { ShowHeader } from './header';
import PlaylistForm from './edit';
import { getShowPlaylists, addNewPlaylist } from '../../actions/playlistActions';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        routing: state.routing,
        show: state.show,
        playlist: state.playlist
    };
};

class Playlist extends Component {
    constructor (props) {
        super(props);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleAddClick (showId) {
        this.props.dispatch(addNewPlaylist(showId));
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

    render () {
        const { show, playlist, dispatch } = this.props;
        const { playlists } = playlist;
        const { currentShow } = show;

        return (
            <div>
                <div className="row">
                    <div className="col col-md-12 col-sm-12">
                        <ShowHeader currentShow={currentShow} />
                    </div>
                </div>
                <div className="row">
                    <Paper className="col col-md-2 col-sm-12">
                        <h2 className="h2">Past Playlists</h2>
                        <PlaylistHistory
                            playlists={playlists}
                            dispatch={dispatch}
                        />
                    </Paper>
                    <Paper className="col col-md-10 col-sm-12">
                        <FloatingActionButton
                            onClick={() => this.handleAddClick(currentShow._id)}
                            secondary={true}
                            mini={true}
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                        <Divider />
                        <PlaylistForm />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Playlist);
