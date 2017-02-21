import { cleanPathname } from '../../../src/client/app/utils/helperFunctions';

describe('Helper functions', () => {
    it('should return the correct pathname', () => {
        const pathname = '/playlists/edit/rad-music-show';
        const shortPath = '/playlists/dope-show';
        const wrongPathname = '/playlists/sad-show/edit';

        const expectedCorrectResultA = '/playlists/rad-music-show';
        const expectedCorrectResultB = '/playlists/dope-show';
        const expectedCorrectResultC = '/playlists/sad-show';

        expect(cleanPathname(pathname)).toEqual(expectedCorrectResultA);
        expect(cleanPathname(shortPath)).toEqual(expectedCorrectResultB);
        expect(cleanPathname(wrongPathname)).toEqual(expectedCorrectResultC);
    });
});
