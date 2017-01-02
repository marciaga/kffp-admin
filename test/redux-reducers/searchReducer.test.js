import searchReducer from '../../src/client/app/reducers/searchReducer';

describe('search reducer', () => {
    it('should return the intial state', () => {
        expect(searchReducer(undefined, {})).toEqual({
            currentSearch: '',
            searchResults: []
        });
    });

    it('should react to an action with the type UPDATE_SEARCH_FIELD', () => {
        const searchQuery = 'Oingo Boingo Weird Science';

        expect(searchReducer(undefined, {
            type: 'UPDATE_SEARCH_FIELD',
            currentSearch: searchQuery
        })).toEqual({
            currentSearch: searchQuery,
            searchResults: []
        });
    });

    it('should react to an action with the type CLEAR_SEARCH_INPUT', () => {
        expect(searchReducer(undefined, {
            type: 'CLEAR_SEARCH_INPUT'
        })).toEqual({
            currentSearch: '',
            searchResults: []
        });
    });

    it('should react to an action with the type SEARCH_RESULTS', () => {
        const mockSearchResults = [{
            artist: 'Magazine',
            track: 'Shot By Both Sides',
            album: 'Reat Life'
        }];

        expect(searchReducer(undefined, {
            type: 'SEARCH_RESULTS',
            data: mockSearchResults
        }));
    })
});
