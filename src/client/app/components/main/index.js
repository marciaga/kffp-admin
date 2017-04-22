import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserShows, getAllShows } from '../../actions/showActions';
import ShowSelect from './select';
import ShowsAutoCompleteFilter from '../form/fields/showsAutocompleteFilter';

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal,
    show: state.show
});

class Main extends Component {
    componentWillReceiveProps (nextProps) {
        const { auth } = nextProps;
        const { user } = auth;

        if (this.props.auth.user !== user) {
            const { id } = user;

            this.props.dispatch(getUserShows(id));
            this.props.dispatch(getAllShows());
        }
    }

    render () {
        const { show, dispatch } = this.props;
        const { shows, userShows } = show;

        return (
            <div className="row">
                <h1 className="flex-horizontal-center col col-md-12">Select a show</h1>
                <div className="flex-horizontal-center user-shows col col-md-6">
                    <ShowSelect dispatch={dispatch} userShows={userShows} />
                </div>
                <div className="flex-horizontal-center col col-md-6">
                    <ShowsAutoCompleteFilter dispatch={dispatch} shows={shows} />
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    dispatch: PropTypes.func,
    show: PropTypes.object,
    auth: PropTypes.object
};

export default connect(mapStateToProps)(Main);
