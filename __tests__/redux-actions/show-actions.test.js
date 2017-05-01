import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { push as mockPush } from 'react-router-redux';
import { API_ENDPOINT } from '../../src/client/app/utils/constants';

import {
    getUserShows,
    getAllShows,
    getShow,
    navigateToPlaylists
} from '../../src/client/app/actions/showActions';

jest.mock('react-router-redux');

describe('Show actions', () => {
    describe('getShow', () => {
        it('should return a type GET_SHOW', () => {
            const dispatch = ({ type }) => expect(type).toBe('GET_SHOW');

            getShow()(dispatch);
        });

        it('should set show to action data', () => {
            const dispatch = ({ data }) => expect(data).toBe('test');

            getShow('test')(dispatch);
        });
    });

    describe('navigateToPlaylists', () => {
        it('should set the passed slug to the pathname', () => {
            const dispatch = () => {};

            navigateToPlaylists('test')(dispatch);
            expect(mockPush.mock.calls[0][0].pathname).toBe('/playlists/test');
        });
    });

    describe('getUserShows', () => {
        let mock;
        let url;

        beforeEach(() => {
            url = `${API_ENDPOINT}/shows?isActive=true&users=test`;
            mock = new MockAdapter(axios);
        });

        it('should return a type USER_SHOW_SELECT on success', async () => {
            const dispatch = ({ type }) => {
                expect(type).toBe('USER_SHOW_SELECT');
            };

            mock.onGet(url).reply(200, []);
            await getUserShows('test')(dispatch);
        });

        it('should map response data to action data', async () => {
            const replyData = [
                {
                    slug: 'testSlug',
                    showName: 'testShowName',
                    shouldFilter: true
                }
            ];

            const expected = [
                {
                    slug: 'testSlug',
                    showName: 'testShowName'
                }
            ];

            const dispatch = ({ data }) => {
                expect(data).toEqual(expected);
            };

            mock.onGet(url).reply(200, replyData);

            await getUserShows('test')(dispatch);
        });

        it('should have a type SNACKBAR_MESSAGE on a bad response', async () => {
            const dispatch = ({ type }) => expect(type).toBe('SNACKBAR_MESSAGE');

            mock.onGet(url).reply(404);
            await getUserShows('test')(dispatch);
        });

        it('should have an error message on a bad response', async () => {
            const dispatch = ({ data }) => {
                expect(data.message).toBe('Something went wrong. Please note the URL and let the web team know.');
            };

            mock.onGet(url).reply(404);
            await getUserShows('test')(dispatch);
        });
    });

    describe('getAllShows', () => {
        let mock;
        let url;

        beforeEach(() => {
            url = `${API_ENDPOINT}/shows`;
            mock = new MockAdapter(axios);
        });

        it('should return a type SHOW_SELECT on success', async () => {
            const dispatch = ({ type }) => expect(type).toBe('SHOW_SELECT');

            mock.onGet(url).reply(200);
            await getAllShows()(dispatch);
        });

        it('should pass response data to action data', async () => {
            const dispatch = ({ data }) => expect(data).toBe('test');

            mock.onGet(url).reply(200, 'test');
            await getAllShows()(dispatch);
        });

        it('should return a type SNACKBAR_MESSAGE on a bad response', async () => {
            const dispatch = ({ type }) => expect(type).toBe('SNACKBAR_MESSAGE');

            mock.onGet(url).reply(404);
            await getAllShows('test')(dispatch);
        });

        it('should have an error message on a bad response', async () => {
            const dispatch = ({ data }) => {
                expect(data.message).toBe('Something went wrong. Please note the URL and let the web team know.');
            };

            mock.onGet(url).reply(404);
            await getAllShows()(dispatch);
        });
    });
});
