import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setModel } from '../../src/client/app/actions/modelActions';
import { API_ENDPOINT } from '../../src/client/app/utils/constants';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
            mock.onGet(`${API_ENDPOINT}/users`).reply(200);

            const expectedActions = [{
                data: returnValue, type: 'SET_MODEL'
            }];

            const store = mockStore({});
            const user = { role: 'admin' };

            await store.dispatch(setModel(user, 'users', 'show'));

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
