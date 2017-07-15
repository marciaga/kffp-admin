import { parseSearchResults } from '../../../src/client/app/utils/searchUtils';

const mockApiResults = require('../../fixtures/apiResponse');
const albumApiResults = require('../../fixtures/spotifyApiAlbums');

describe('parse search results function', () => {
    it('should return an array of objects, each representing a search result', () => {
        expect(parseSearchResults(mockApiResults, albumApiResults.albums)).toBeDefined();
    });
});
