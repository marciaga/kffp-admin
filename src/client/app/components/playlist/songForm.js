import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ConfirmationDialog from '../feedback/confirm';
import { playlistFields } from '../../data';
import { debounce } from '../../utils/helperFunctions';
import { FORM_FIELD_DEBOUNCE_TIME } from '../../utils/constants';
import { updateSongForm } from '../../actions/formActions';
import { confirmOpen } from '../../actions/feedbackActions';
import {
    updatePlaylistSong,
    deleteSongFromPlaylist
} from '../../actions/playlistActions';

const mapStateToProps = state => ({
    feedback: state.feedback
});

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

    openConfirmDialog () {
        this.props.dispatch(confirmOpen(true, null));
    }

    debouncedHandler (val, field) {
        const songId = this.props.id;

        this.props.dispatch(updateSongForm({ val, songId, field }));
    }

    submitHandler (e) {
        e.preventDefault();
        const songToUpdate = this.props.currentSong;
        const { playlistId } = this.props;
        // TODO perform validation, incl. check to make sure any fields have actually changes
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
        const { currentSong, playlistId, dispatch, feedback } = this.props;

        return (
            <div>
                <Divider />
                <form onSubmit={this.submitHandler}>
                    {this.renderFormFields(currentSong)}
                    <div>
                        <RaisedButton type="submit" label="Submit Track Info" />
                    </div>
                </form>
                <IconButton
                    onClick={() => this.openConfirmDialog()}
                >
                    <ActionDelete />
                </IconButton>
                <ConfirmationDialog
                    title="Are you sure want to delete this song?"
                    open={feedback.confirmDialog.open}
                    cancelHandler={() => dispatch(confirmOpen(false, null))}
                    okHandler={() =>
                        dispatch(deleteSongFromPlaylist(currentSong, playlistId))
                    }
                />
            </div>
        );
    }
}

SongForm.propTypes = {
    currentSong: PropTypes.object,
    playlistId: PropTypes.string,
    dispatch: PropTypes.func,
    id: PropTypes.string,
    feedback: PropTypes.object
};

export default connect(mapStateToProps)(SongForm);
