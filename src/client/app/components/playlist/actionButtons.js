import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';
import { addNewPlaylist } from '../../actions/playlistActions';
import { togglePlaylistDrawer } from '../../actions/uiActions';

const ActionButtons = ({ dispatch, showId }) => (
    <div className="flex-horizontal-center col col-md-12 col-sm-12">
        <RaisedButton
            onClick={() => dispatch(addNewPlaylist(showId))}
            label="Make Playlist"
            secondary={true}
            icon={<ContentAdd />}
            className="playlist-action__button"
        />
        <RaisedButton
            onClick={() => dispatch(togglePlaylistDrawer(false))}
            label="Edit Past Playlists"
            secondary={true}
            icon={<EditorModeEdit />}
            className="playlist-action__button"
        />
    </div>
);

export default ActionButtons;
