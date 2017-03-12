import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
    router: state.router
});

class Shows extends Component {
    constructor (props) {
        super(props);
        console.log('show constructor', props.router)
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        console.log('current', this.props.router)
        console.log('next', nextProps.router)
        const { auth } = nextProps;
        const { user } = auth;

        if (this.props.auth.user !== user) {
            if (user.scope !== 'admin') {
                return this.props.dispatch(push('/'));
            }
            this.props.dispatch(setModel(user, 'shows', 'show'));
        }
    }

    handleClick (formType, modelName) {
        const { showModal } = this.props.modal;

        this.props.dispatch(setFormData(formType, modelName));
        this.props.dispatch(handleModal(showModal));
    }

    render () {
        const { model } = this.props;

        console.log('show render', model)
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
