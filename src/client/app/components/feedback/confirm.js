import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const ConfirmationDialog = ({ title, open, cancelHandler, okHandler }) => {
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={cancelHandler}
        />,
        <FlatButton
            label="OK"
            primary={true}
            onTouchTap={okHandler}
        />
    ];

    return (
        <div>
            <Dialog
                title={title}
                actions={actions}
                modal={true}
                open={open}
            />
        </div>
    );
};

ConfirmationDialog.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    cancelHandler: PropTypes.func,
    okHandler: PropTypes.func
};

export default ConfirmationDialog;
