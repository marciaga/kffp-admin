import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';
import { push } from 'react-router-redux';
import { addNewPlaylist } from '../../actions/playlistActions';

const ActionButtons = ({ dispatch, slug, showId }) => (
    <div className="col col-md-10 col-sm-12">
        <RaisedButton
            onClick={() => dispatch(addNewPlaylist(showId))}
            label="Make Playlist"
            secondary={true}
            icon={<ContentAdd />}
        />
        <RaisedButton
            onClick={() => dispatch(push(slug))}
            label="Edit Past Playlists"
            secondary={true}
            icon={<EditorModeEdit />}
        />
    </div>
);

export default ActionButtons;
