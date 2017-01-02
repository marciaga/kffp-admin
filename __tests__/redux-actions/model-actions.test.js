import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import { setModel } from '../../src/client/app/actions/modelActions';

const returnValue = {
    model: {
        fields: {
            displayName: {
                label: 'Display Name'
            },
            email: {
                label: 'Email'
            },
            role: {
                label: 'Role'
            }
        },
        name: 'users',
        type: 'show'
    }
};

describe('Model actions', () => {
    describe('setModel', () => {
        it('should return a type of SET_MODEL', async () => {

            mock.onGet('/api/users').reply(200);

            const expectedActions = [{
                data: returnValue, type: 'SET_MODEL'
            }];

            const store = mockStore({});
            const user = { role: 'admin' };
            const response = await store.dispatch(setModel(user, 'users', 'show'));

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
