import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV);

const storeFactory = (initialState) => {
    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });
    const middleware = [thunk, routerMiddleware(browserHistory)];

    const devToolComposition = compose(
        applyMiddleware(...middleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore);

    const factory = process.env.NODE_ENV !== 'production' ? devToolComposition : applyMiddleware(...middleware)(createStore);
    const store = factory(rootReducer, initialState);
    return store;
};

export default storeFactory;
