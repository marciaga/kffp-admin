import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Fuse from 'fuse.js';
import { setModel } from '../../src/client/app/actions/modelActions';
import { API_ENDPOINT } from '../../src/client/app/utils/constants';

const fuse = new Fuse(undefined, {
    keys: ['firstName', 'lastName', 'displayName', 'email', 'role']
});
const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const returnValue = {
    model: {
        data: undefined,
        fields: {
            firstName: {
                label: 'First Name'
            },
            lastName: {
                label: 'Last Name'
            },
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
        type: 'show',
        fuse
    }
};

describe('Model actions', () => {
    describe('setModel', () => {
        it('should return a type of SET_MODEL', async () => {
            mock.onGet(`${API_ENDPOINT}/users`).reply(200);

            const expectedActions = [{
                type: 'SET_MODEL',
                data: returnValue
            }];

            const store = mockStore({});
            const user = { role: 'admin' };

            await store.dispatch(setModel(user, 'users', 'show'));

            expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions));
        });
    });
});
