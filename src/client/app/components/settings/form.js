import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';

import {
    updateUserSettingsInput,
    updateUserPassword
} from '../../actions/formActions';

const styles = {
    input: {
        display: 'block'
    }
};

const UserSettingsForm = ({ fields, user, dispatch }) => {
    const { currentPassword, newPasswordFirst, newPasswordSecond } = fields;

    const submitHandler = (e) => {
        e.preventDefault();

        const { name } = e.target;
        const { id } = user;

        dispatch(updateUserPassword({ id, name, fields }));
    };

    const handleInputUpdate = (e) => {
        const { value, name } = e.target;

        dispatch(updateUserSettingsInput({ value, name }));
    };

    return (
        <div className="row">
            <h1 className="page-heading">User Settings</h1>
            <div className="col col-md-12 flex-horizontal-center">
                <Card
                    style={{ minWidth: 600 }}
                    containerStyle={{ minWidth: 600 }}
                >
                    <CardHeader title="Change Password" />
                    <form
                        onSubmit={submitHandler}
                        name="changePassword"
                    >
                        <CardText>
                            <TextField
                                onChange={handleInputUpdate}
                                type="password"
                                hintText="Enter your current password."
                                name="currentPassword"
                                value={currentPassword || ''}
                                style={styles.input}
                            />
                            <TextField
                                onChange={handleInputUpdate}
                                type="password"
                                name="newPasswordFirst"
                                hintText="Enter your new password."
                                value={newPasswordFirst || ''}
                                style={styles.input}
                            />
                            <TextField
                                onChange={handleInputUpdate}
                                type="password"
                                name="newPasswordSecond"
                                hintText="Enter your new password again."
                                value={newPasswordSecond || ''}
                                style={styles.input}
                            />
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label="Update Password"
                                type="submit"
                                secondary={true}
                            />
                        </CardActions>
                    </form>
                </Card>
            </div>
        </div>
    );
};

UserSettingsForm.propTypes = {
    fields: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func
};

export default UserSettingsForm;
