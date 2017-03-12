import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import authMiddleware from './middleware/authMiddleware';

const NODE_ENV = process.env.NODE_ENV;
console.log('__NODE_ENV__', NODE_ENV);

const storeFactory = (initialState, history) => {
    const rootReducer = combineReducers({
        ...reducers,
        router: routerReducer
    });
    const middleware = [thunk, authMiddleware, routerMiddleware(history)];

    const devToolComposition = compose(
        applyMiddleware(...middleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore);

    const factory = process.env.NODE_ENV !== 'production' ? devToolComposition : applyMiddleware(...middleware)(createStore);
    const store = factory(rootReducer, initialState);

    return store;
};

export default storeFactory;
