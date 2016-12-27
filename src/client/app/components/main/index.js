import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveShows } from '../../actions/showActions';
import ShowSelect from './select';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        modal: state.modal,
        show: state.show
    };
};

class Main extends Component {
    constructor (props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { auth } = nextProps;
        const { user } = auth;

        if (this.props.auth.user !== user) {
            this.props.dispatch(getActiveShows());
        }
    }

    render () {
        const { show, dispatch } = this.props;
        const { shows } = show;

        return (
            <div>
                <h1>Select a show</h1>
                <ShowSelect dispatch={dispatch} shows={shows} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Main);
