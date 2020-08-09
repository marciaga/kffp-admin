import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import * as thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import authMiddleware from './middleware/authMiddleware';

const NODE_ENV = process.env.NODE_ENV;
console.log('__NODE_ENV__', NODE_ENV);

const storeFactory = (initialState) => {
    const appReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    const rootReducer = (state, action) => {
        if (action.type === 'LOGOUT_SUCCESS') {
            const { routing } = state

            state = { routing }
        }

        return appReducer(state, action);
    };

    const middleware = [thunk.default, authMiddleware, routerMiddleware(browserHistory)];

    const devToolComposition = compose(
        applyMiddleware(...middleware),
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )(createStore);

    const factory = process.env.NODE_ENV !== 'production' ? devToolComposition : applyMiddleware(...middleware)(createStore);
    const store = factory(rootReducer, initialState);
    return store;
};

export default storeFactory;
