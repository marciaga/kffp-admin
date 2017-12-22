import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { updatePlaylistTitleField } from '../../actions/playlistActions';

class PlaylistTitleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistTitle: props.playlistTitle || '',
            characterCount: 0,
            errorColor: 'lightBlue'
        };
    }

    handleChange = (e, val) => {
        this.setState({
            playlistTitle: val,
            characterCount: val.length,
            errorColor: this.checkCharCount(val.length)
        });
    }

    handleSave = () => {
        if (this.state.characterCount > 200) {
            return;
        }
        // dispatch the save action
    }

    checkCharCount = count => count > 200 ? 'red' : 'lightBlue';

    render () {
        const { characterCount } = this.state;

        return (
            <div>
                <TextField
                    hintText="Playlist Title (optional)"
                    floatingLabelText="Playlist Title (optional)"
                    floatingLabelStyle={{ color: 'lightGrey' }}
                    errorText={`${characterCount}/200 max characters`}
                    errorStyle={{ color: this.state.errorColor }}
                    multiLine={true}
                    rowsMax={6}
                    value={this.state.playlistTitle}
                    onChange={this.handleChange}
               />
                <FlatButton
                    label="Save"
                    onClick={this.handleSave}
                />
            </div>
        );
    }
};

export default PlaylistTitleForm;
