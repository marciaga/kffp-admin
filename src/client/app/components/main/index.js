import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import { Card, CardHeader } from 'material-ui/Card';
import { getUserShows, getAllShows } from '../../actions/showActions';
import ShowSelect from './select';
import ShowsAutoCompleteFilter from '../form/fields/showsAutocompleteFilter';
import VolunteerWidget from './volunteer-widget';

const getUserId = pathOr('', ['user', 'id']);

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal,
    show: state.show,
    volunteer: state.volunteer
});

class Main extends Component {
    componentWillReceiveProps (nextProps) {
        const { auth } = nextProps;
        const { user } = auth;
        const { id } = user;

        if (id && this.props.auth.user !== user) {
            this.props.dispatch(getUserShows(id));
            this.props.dispatch(getAllShows());
        }
    }

    render () {
        const { show, dispatch, volunteer, auth } = this.props;
        const { shows, userShows } = show;

        return (
            <div>
                <div className="row">
                    <h1 className="flex-horizontal-center col col-md-12">Select a show</h1>
                    <div className="flex-horizontal-center user-shows col col-md-6">
                        <ShowSelect dispatch={dispatch} userShows={userShows} />
                    </div>
                    <div className="flex-horizontal-center col col-md-6">
                        <ShowsAutoCompleteFilter dispatch={dispatch} shows={shows} />
                    </div>
                </div>
                <div className="row">
                    <div className="flex-horizontal-center user-shows col col-md-6">
                        <Card
                            style={{ minWidth: 600 }}
                            containerStyle={{ minWidth: 600 }}
                        >
                            <CardHeader title="My Volunteer Hours" />
                            <VolunteerWidget
                                dispatch={dispatch}
                                startDate={volunteer.startDate}
                                endDate={volunteer.endDate}
                                results={volunteer.results}
                                userId={getUserId(auth)}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    dispatch: PropTypes.func,
    show: PropTypes.object,
    auth: PropTypes.object,
    volunteer: PropTypes.object
};

export default connect(mapStateToProps)(Main);
