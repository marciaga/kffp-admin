import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { showOrHideModal } from '../../actions/modalActions';
import { setUpdateFormData } from '../../actions/formActions';

/*
 * open a modal which has a field for user's password
 * it will also have two fields for new password
 * send all these to the server to validate and assign a new password
 */

const mapStateToProps = state => ({
    modal: state.modal
});

class Settings extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.props.dispatch(setUpdateFormData('settings', 'users', {}));
        this.props.dispatch(showOrHideModal(true));
    }

    render () {
        return (
            <div className="user-settings">
                <RaisedButton
                    label="Change Your Password"
                    type="button"
                    secondary={true}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Settings);
