import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

/*
 * open a modal which has a field for user's password
 * it will also have two fields for new password
 * send all these to the server to validate and assign a new password
 */

const mapStateToProps = state => ({
    modal: state.modal
});

class Settings extends Component {
    render () {
        return (
            <div className="user-settings">
                <RaisedButton
                    label="Change Your Password"
                    type="button"
                    secondary={true}
                    onClick={() => console.log('o')}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Settings);
