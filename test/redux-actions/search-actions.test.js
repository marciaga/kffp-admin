import { searchInput } from '../../src/client/app/actions/searchActions';

describe('actions', () => {
    describe('searchInput', () => {
        it('should return a type of UPDATE_SEARCH_FIELD', () => {
            expect(searchInput().type).toEqual('UPDATE_SEARCH_FIELD');
        });

        it('should pass the search string as data', () => {
            const search = 'Sonic Youth Dirty Boots';

            expect(searchInput(search).currentSearch).toEqual(search);
        });
    });
});
