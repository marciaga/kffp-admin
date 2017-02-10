import React, { Component } from 'react';
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
            const { displayName } = user;

            this.props.dispatch(getUserShows(displayName));
            this.props.dispatch(getAllShows());
        }
    }

    render () {
        const { show, dispatch } = this.props;
        const { shows, userShows } = show;

        return (
            <div>
                <h1>Select a show</h1>
                <ShowSelect dispatch={dispatch} userShows={userShows} />
                <ShowsAutoCompleteFilter dispatch={dispatch} shows={shows} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Main);
