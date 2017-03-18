import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AvQueueMusic from 'material-ui/svg-icons/av/queue-music';
import { receivePlaylist } from '../../actions/playlistActions';
import { setSongForm } from '../../actions/formActions';
import { togglePlaylistDrawer } from '../../actions/uiActions';
import {
    pathHasPlaylistDate,
    removeDateFromPath
} from '../../utils/helperFunctions';

const mapStateToProps = state => ({
    ui: state.ui,
    routing: state.routing,
    playlist: state.playlist
});

class PlaylistHistory extends Component {
    constructor (props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
    }

    clickHandler (p, dispatch) {
        const { playlistDrawer, routing } = this.props;
        const { songs, dateSlug } = p;
        const {
            locationBeforeTransitions: {
                pathname = '/'
            }
        } = routing;
        const path = pathHasPlaylistDate(pathname) ?
            `${removeDateFromPath(pathname)}/${dateSlug}` :
            `${pathname}/${dateSlug}`;

        dispatch(push(path));
        dispatch(togglePlaylistDrawer(!playlistDrawer));
        dispatch(setSongForm(songs));
        dispatch(receivePlaylist(p));
    }

    renderListItems (playlists, dispatch) {
        if (!playlists.length) {
            return;
        }

        return (
            playlists.map((p, i) => (
                <MenuItem
                    key={i}
                    primaryText={p.dateSlug}
                    leftIcon={<AvQueueMusic />}
                    onClick={() => this.clickHandler(p, dispatch)}
                />
            ))
        );
    }

    render () {
        const { dispatch, playlists, ui } = this.props;
        const { playlistDrawer } = ui;

        return (
            <Drawer
                docked={false}
                width={200}
                open={playlistDrawer}
                onRequestChange={() => dispatch(togglePlaylistDrawer(playlistDrawer))}
            >
                {this.renderListItems(playlists, dispatch)}
            </Drawer>
        );
    }
}

export default connect(mapStateToProps)(PlaylistHistory);
