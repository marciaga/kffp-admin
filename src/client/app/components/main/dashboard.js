import React, { Component, PropTypes } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import { getUserShows, getAllShows } from '../../actions/showActions';
import VolunteerWidget from './volunteer-widget';
import ShowSelect from './select';
import ShowsAutoCompleteFilter from '../form/fields/showsAutocompleteFilter';
import {
    getCurrentMonthVolunteer,
    clearOwnVolunteerHours
} from '../../actions/volunteerActions';

const getUserId = pathOr('', ['user', 'id']);
const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal,
    show: state.show,
    volunteer: state.volunteer
});

class Dashboard extends Component {
    componentWillReceiveProps (nextProps) {
        const { auth } = nextProps;
        const { user } = auth;
        const { id } = user;

        if (id && this.props.auth.user !== user) {
            this.props.dispatch(getUserShows(id));
            this.props.dispatch(getAllShows());
            this.props.dispatch(getCurrentMonthVolunteer(id));
        }
    }

    componentWillUnmount () {
        this.props.dispatch(clearOwnVolunteerHours());
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
                    <div className="flex-horizontal-center user-shows col col-md-12">
                        <Card
                            style={{ minWidth: 600 }}
                            containerStyle={{ minWidth: 600 }}
                        >
                            <VolunteerWidget
                                dispatch={dispatch}
                                startDate={volunteer.startDate}
                                endDate={volunteer.endDate}
                                results={volunteer.results}
                                userId={getUserId(auth)}
                                currentHours={volunteer.currentHours}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    dispatch: PropTypes.func,
    show: PropTypes.object,
    auth: PropTypes.object
};

export default connect(mapStateToProps)(Dashboard);
