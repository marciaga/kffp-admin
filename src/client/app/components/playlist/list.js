import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import AvQueueMusic from 'material-ui/svg-icons/av/queue-music';
import { receivePlaylist } from '../../actions/playlistActions';
import { setSongForm } from '../../actions/formActions';
import { togglePlaylistDrawer } from '../../actions/uiActions';

const mapStateToProps = (state) => ({
    ui: state.ui
});

class PlaylistHistory extends Component {
    constructor (props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
    }

    clickHandler (p, dispatch) {
        const { playlistDrawer } = this.props;
        const { songs } = p;

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
