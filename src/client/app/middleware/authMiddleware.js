import { browserHistory } from 'react-router';
import { verifyLogin } from '../actions/authActions';
import { LOCATION_CHANGE } from '../constants';

const authMiddleware = store => next => (action) => {
    switch (action.type) {
    case LOCATION_CHANGE:
        const hasToken = localStorage.getItem('idToken') !== null;
        const { pathname } = action.payload;

        if (!hasToken && pathname !== '/') {
            return browserHistory.push('/');
        }

        store.dispatch(verifyLogin(
            hasToken
        ));

        return next(action);

    default:
        return next(action);
    }
};

export default authMiddleware;
