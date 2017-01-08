import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { playlistFields } from '../../data';
import { debounce } from '../../utils/helperFunctions';
import { FORM_FIELD_DEBOUNCE_TIME } from '../../utils/constants';

class SongForm extends Component {
    constructor (props) {
        super(props);

        this.renderFormFields = this.renderFormFields.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.debouncer = debounce(this.debouncedHandler, FORM_FIELD_DEBOUNCE_TIME);
    }

    changeHandler (e) {
        this.debouncer(e.target.value);
    }

    debouncedHandler (val) {
        // dispatch an action to update the form state playlist.currentPlaylist.songs
        console.log(val);
    }

    submitHandler (e) {
        e.preventDefault();
        // const { formType, modelName } = this.props.form;
        // TODO perform validation
        console.log('submit');
        // dispatch action to do a patch with song data from store
        // this.props.dispatch(prepareFormSubmit(formType, modelName));
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
                    onChange={this.changeHandler}
                />
            );
        });
    }

    render () {
        const { id } = this.props;

        return (
            <div>
                <Divider />
                <form onSubmit={this.submitHandler}>
                    {this.renderFormFields(this.props)}
                    <input type="hidden" value={id} />
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
