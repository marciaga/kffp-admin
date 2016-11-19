import searchReducer from '../../src/client/app/reducers/searchReducer';

describe('search reducer', () => {
    it('should return the intial state', () => {
        expect(searchReducer(undefined, {})).toEqual({
            currentSearch: ''
        });
    });

    it('should react to an action with the type UPDATE_SEARCH_FIELD', () => {
        const searchQuery = 'Oingo Boingo Weird Science';

        expect(searchReducer(undefined, {
            type: 'UPDATE_SEARCH_FIELD',
            currentSearch: searchQuery
        })).toEqual({
            currentSearch: searchQuery
        });
    });
});
