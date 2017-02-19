import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    updateUserSettingsInput,
    updateUserPassword
} from '../../actions/formActions';

const UserSettingsForm = ({ fields, user, dispatch }) => {
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('yolo');

        const { name } = e.target;
        const { id } = user;

        dispatch(updateUserPassword({ id, name, fields }));
    };

    const handleInputUpdate = (e) => {
        const { value, name } = e.target;

        dispatch(updateUserSettingsInput({ value, name }));
    };

    return (
        <form onSubmit={submitHandler} name="changePassword">
            <TextField
                onChange={handleInputUpdate}
                type="password"
                hintText="Enter your current password."
                name="currentPassword"
            />
            <TextField
                onChange={handleInputUpdate}
                type="password"
                name="newPasswordFirst"
                hintText="Enter your new password."
            />
            <TextField
                onChange={handleInputUpdate}
                type="password"
                name="newPasswordSecond"
                hintText="Enter your new password again."
            />
            <RaisedButton
                label="Update Password"
                type="submit"
                secondary={true}
            />
        </form>
    );
};

export default UserSettingsForm;
