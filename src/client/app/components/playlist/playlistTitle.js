import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { updatePlaylistTitleField } from '../../actions/playlistActions';

class PlaylistTitleForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlistTitle: props.playlistTitle || '',
            characterCount: this.setCharCount(props.playlistTitle),
            errorColor: 'lightBlue'
        };
    }

    componentWillReceiveProps (nextProps) {
        const currentTitle = this.props.playlistTitle;
        const newTitle = nextProps.playlistTitle;

        if (currentTitle !== newTitle) {
            this.setState({
                playlistTitle: newTitle || '',
                characterCount: this.setCharCount(newTitle)
            });
        }
    };

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

        this.props.dispatch(updatePlaylistTitleField({
            playlistTitle: this.state.playlistTitle,
            playlistId: this.props.playlistId
        }));
    }

    setCharCount = str => str && str.length ? str.length : 0;

    checkCharCount = count => count > 200 ? 'red' : 'lightBlue';

    render () {
        const { characterCount } = this.state;

        return (
            <div style={{ display: 'flex' }}>
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
           <div
               style={{
                   display: 'flex',
                   alignItems: 'center'
                }}>
                    <FlatButton
                        label="Save"
                        onClick={this.handleSave}
                    />

               </div>
            </div>
        );
    }
};

export default PlaylistTitleForm;
