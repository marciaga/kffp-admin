import { push } from 'react-router-redux';
import { verifyLogin } from '../actions/authActions';
import { LOCATION_CHANGE } from '../constants';

const authMiddleware = store => next => (action) => {
    switch (action.type) {
    case LOCATION_CHANGE:
    console.log('Location change to', action.payload)
        const hasToken = localStorage.getItem('idToken') !== null;
        const { pathname } = action.payload;

        if (!hasToken && pathname !== '/') {
            return store.dispatch(push('/'));
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
