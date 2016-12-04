import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleModal } from '../../actions/modalActions';

const mapStateToProps = (state) => {
    return {
        shows: state.shows,
        modal: state.modal
    }
};

class Shows extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const { showModal } = this.props.modal;

        this.props.dispatch(handleModal(showModal));
    }

    render () {
        return (
            <div>
                <h1>Shows</h1>
                <p>Add New Show</p>
                <button onClick={() => this.handleClick()}
                    className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                >
                    <i className="material-icons">add</i>
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Shows);
