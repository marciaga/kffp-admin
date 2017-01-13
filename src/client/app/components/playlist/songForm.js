import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { playlistFields } from '../../data';
import { debounce } from '../../utils/helperFunctions';
import { FORM_FIELD_DEBOUNCE_TIME } from '../../utils/constants';
import { updateSongForm } from '../../actions/formActions';
import { updatePlaylistSong } from '../../actions/playlistActions';

class SongForm extends Component {
    constructor (props) {
        super(props);

        this.renderFormFields = this.renderFormFields.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.debouncer = debounce(this.debouncedHandler, FORM_FIELD_DEBOUNCE_TIME);
    }

    changeHandler (e, field) {
        this.debouncer(e.target.value, field);
    }

    debouncedHandler (val, field) {
        const songId = this.props.id;

        this.props.dispatch(updateSongForm({ val, songId, field }));
    }

    submitHandler (e) {
        e.preventDefault();
        const songToUpdate = this.props.currentSong;
        const { playlistId } = this.props;
        // TODO perform validation
        this.props.dispatch(updatePlaylistSong(songToUpdate, playlistId));
    }

    renderFormFields (fields) {
        const fieldMapping = playlistFields.fields;
        const fieldMapWithValues = Object.keys(fieldMapping).map((f) => {
            fieldMapping[f].value = fields[f];

            return fieldMapping[f];
        });

        return fieldMapWithValues.map((field, i) => {
            const { hintText, name, label, value } = field;

            return (
                <TextField
                    key={i}
                    id={`name-${i}`}
                    name={name}
                    floatingLabelText={label}
                    defaultValue={value || ''}
                    hintText={hintText}
                    type={'text'}
                    onChange={e => this.changeHandler(e, name)}
                />
            );
        });
    }

    render () {
        const { currentSong } = this.props;

        return (
            <div>
                <Divider />
                <form onSubmit={this.submitHandler}>
                    {this.renderFormFields(currentSong)}
                    <RaisedButton type="submit" label="Update Track Info" />
                </form>
            </div>
        );
    }
}

export default SongForm;
/*
    artist, track, album, releaseDate, id
*/
