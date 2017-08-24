import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserSettingsForm from './form';

const mapStateToProps = state => ({
    form: state.form,
    auth: state.auth
});

const Settings = (props) => {
    const { dispatch, form, auth } = props;
    const { user } = auth;

    return (
        <div className="user-settings">
            <UserSettingsForm
                dispatch={dispatch}
                fields={form.fields}
                user={user}
            />
        </div>
    );
};

Settings.propTypes = {
    dispatch: PropTypes.func,
    form: PropTypes.object,
    auth: PropTypes.object
};

export default connect(mapStateToProps)(Settings);
