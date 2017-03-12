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
        console.log('prev props', this.props)
        console.log('next props', nextProps)
        const { auth } = nextProps;
        const { user } = auth;

        // console.log(this.props.auth.user)
        // console.log(user)
        /*
        if (this.props.auth.user !== user) {
            const { displayName } = user;
            // this is getting called when it shouldn't be and probably other components doing this check as well
            console.log('gonna do a dispatch')
            this.props.dispatch(getUserShows(displayName));
            this.props.dispatch(getAllShows());
        }
        */
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

export default connect(mapStateToProps)(Main);
