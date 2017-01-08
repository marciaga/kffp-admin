import React from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { playlistFields } from '../../data';

const renderFormFields = (fields) => {
    const fieldMapping = playlistFields.fields;
    const fieldMapWithValues = Object.keys(fieldMapping).map(f => {
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
                value={value || ''}
                hintText={hintText}
                type={'text'}
            />
        );
    });
};

const submitHandler = (e) => {
    e.preventDefault();
    // const { formType, modelName } = this.props.form;
    // TODO perform validation
    this.props.dispatch(prepareFormSubmit(formType, modelName));
}

const SongForm = (props) => {
    const { id } = props;

    return (
        <div>
            <Divider />
            <form>
                {renderFormFields(props)}
                <input type="hidden" value={id} />
            </form>
            <RaisedButton type="submit" label="Default" style={style} />
        </div>
    );
};

export default SongForm;
/*
    artist, track, album, releaseDate, id
*/
