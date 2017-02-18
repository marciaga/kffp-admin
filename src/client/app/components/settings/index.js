import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserSettingsForm from './form';

const mapStateToProps = state => ({
    form: state.form,
    auth: state.auth
});

class Settings extends Component {
    render () {
        const { dispatch, form, auth } = this.props;
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
    }
}

export default connect(mapStateToProps)(Settings);
