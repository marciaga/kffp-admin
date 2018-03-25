import React, { Component, PropTypes } from 'react';
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

class Products extends Component {
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

            this.props.dispatch(setModel(user, 'products', 'show', { query: '?admin=1'}));
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
                <h2>Add New Product</h2>
                <FloatingActionButton
                    onClick={() => this.handleClick('new', 'products')}
                    secondary={true}
                    style={{}}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <MainTable model={model} />
            </div>
        );
    }
}

Products.propTypes = {
    model: PropTypes.object,
    showModal: PropTypes.bool,
    dispatch: PropTypes.func,
    modal: PropTypes.object,
    auth: PropTypes.object
};

export default connect(mapStateToProps)(Products);
