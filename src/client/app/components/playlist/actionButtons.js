import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';
import { push } from 'react-router-redux';
import { addNewPlaylist } from '../../actions/playlistActions';

const ActionButtons = ({ dispatch, slug, showId }) => (
    <div className="flex-horizontal-center col col-md-12 col-sm-12">
        <RaisedButton
            onClick={() => dispatch(addNewPlaylist(showId))}
            label="Make Playlist"
            secondary={true}
            icon={<ContentAdd />}
            className="playlist-action-button"
        />
        <RaisedButton
            onClick={() => dispatch(push(slug))}
            label="Edit Past Playlists"
            secondary={true}
            icon={<EditorModeEdit />}
            className="playlist-action-button"
        />
    </div>
);

export default ActionButtons;
