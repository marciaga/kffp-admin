import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MainTable from '../table';
import { handleModal } from '../../actions/modalActions';
import { setModel } from '../../actions/modelActions';
import { setFormData } from '../../actions/formActions';

const mapStateToProps = state => ({
    modal: state.modal,
    model: state.model,
    auth: state.auth,
    routing: state.routing
});

class Users extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { auth } = nextProps;
        const { user } = auth;

        if (this.props.auth.user !== user) {
            if (user.scope !== 'admin') {
                return browserHistory.push('/');
            }

            this.props.dispatch(setModel(user, 'users', 'show'));
        }
    }

    handleClick (formType, modelName) {
        const { showModal } = this.props.modal;

        this.props.dispatch(setFormData(formType, modelName));
        this.props.dispatch(handleModal(showModal));
    }

    render () {
        const { model } = this.props;

        return (
            <div>
                <p>Add New User</p>
                <FloatingActionButton onClick={() => this.handleClick('new', 'users')} secondary={true} style={{}}>
                    <ContentAdd />
                </FloatingActionButton>
                <MainTable model={model} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Users);
