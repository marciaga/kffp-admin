import React, { Component } from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { handleModal } from '../../actions/modalActions';
import { setFormData } from '../../actions/formActions';

const mapStateToProps = (state) => {
    return {
        shows: state.shows,
        modal: state.modal,
        form: state.form
    }
};

class Shows extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (formType, model) {
        const { showModal } = this.props.modal;

        this.props.dispatch(setFormData(formType, model));
        this.props.dispatch(handleModal(showModal));
    }

    render () {
        return (
            <div>
                <h1>Shows</h1>
                <p>Add New Show</p>
                <FloatingActionButton onClick={() => this.handleClick('new', 'show')} secondary={true} style={{}}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Shows);
