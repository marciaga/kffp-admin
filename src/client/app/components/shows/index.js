import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MainTable from '../table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { handleModal } from '../../actions/modalActions';
import { setModel } from '../../actions/modelActions';
import { setFormData } from '../../actions/formActions';

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
        model: state.model,
        auth: state.auth,
        routing: state.routing
    }
};

class Shows extends Component {
    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (formType, modelName) {
        const { showModal } = this.props.modal;

        this.props.dispatch(setFormData(formType, modelName));
        this.props.dispatch(handleModal(showModal));
    }

    componentWillReceiveProps(nextProps) {
        const { auth, routing } = nextProps;
        const { user } = auth;
        const { locationBeforeTransitions } = routing;

        if (this.props.auth.user !== user) {
            if (user.scope !== 'admin') {
                return browserHistory.push('/');
            }
            this.props.dispatch(setModel(user, 'shows', 'show'));
        }
    }

    render () {
        const { model } = this.props;

        return (
            <div>
                <p>Add New Show</p>
                <FloatingActionButton onClick={() => this.handleClick('new', 'shows')} secondary={true} style={{}}>
                    <ContentAdd />
                </FloatingActionButton>
                <MainTable model={model} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Shows);
