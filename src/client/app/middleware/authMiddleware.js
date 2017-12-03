import { browserHistory } from 'react-router';
import { verifyLogin } from '../actions/authActions';
import { LOCATION_CHANGE } from '../constants';
import { getTokenFromLocalStorage } from '../utils/helperFunctions';

const authMiddleware = store => next => (action) => {
    switch (action.type) {
    case LOCATION_CHANGE:
        const hasToken = getTokenFromLocalStorage() !== null;
        const { pathname } = action.payload;

        if (pathname === '/reset-password') {
            return next(action);
        }

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
