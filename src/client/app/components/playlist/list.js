import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import AvQueueMusic from 'material-ui/svg-icons/av/queue-music';
import { receivePlaylist } from '../../actions/playlistActions';
import { setSongForm } from '../../actions/formActions';

const clickHandler = (p, dispatch) => {
    const { songs } = p;

    dispatch(setSongForm(songs));
    dispatch(receivePlaylist(p));
};

const renderListItems = (playlists, dispatch) => {
    if (!playlists.length) {
        return;
    }

    return (
        playlists.map((p, i) => (
            <ListItem
                key={i}
                primaryText={p.dateSlug}
                leftIcon={<AvQueueMusic />}
                onClick={() => clickHandler(p, dispatch)}
            />
        ))
    );
};

const PlaylistHistory = ({ dispatch, playlists }) => (
    <Paper className="col col-md-2 col-sm-12">
        <h2 className="h2">Past Playlists</h2>
        <List>
            {renderListItems(playlists, dispatch)}
        </List>
    </Paper>
);

export default PlaylistHistory;
