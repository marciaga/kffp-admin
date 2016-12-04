import React from 'react';

const Modal = ({ showModal }) => {
    return (
        <dialog className="mdl-dialog" open={showModal}>
            <div className="mdl-dialog__content">
                <p>
                    Form goes here
                </p>
            </div>
            <div className="mdl-dialog__actions mdl-dialog__actions--full-width">
                buttons go here
            </div>
        </dialog>
    );
};

export { Modal };
