import { parseSearchResults } from '../../../src/client/app/utils/searchUtils';
const mockApiResults = require('../../fixtures/apiResponse');

describe('parse search results function', () => {
    it('should return an array of objects, each representing a search result', () => {
        expect(parseSearchResults(mockApiResults)).toBeDefined();
    });
});
