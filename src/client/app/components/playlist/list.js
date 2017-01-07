import React from 'react';
import { List, ListItem } from 'material-ui/List';
import AvQueueMusic from 'material-ui/svg-icons/av/queue-music';
import { receivePlaylist } from '../../actions/playlistActions';

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
                onClick={() => dispatch(receivePlaylist(p))}
            />
        ))
    );
};

const PlaylistHistory = ({ dispatch, playlists }) => (
    <List>
        {renderListItems(playlists, dispatch)}
    </List>
);

export default PlaylistHistory;
