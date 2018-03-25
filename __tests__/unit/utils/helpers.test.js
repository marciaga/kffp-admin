import { cleanPathname } from '../../../src/client/app/utils/helperFunctions';
import { priceValidator } from '../../../src/client/app/utils/formValidation';

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

    it('should validate the price', () => {
        const num = 0;
        const s = '4';
        const s1 = '0';
        const s2 = '0.4';
        const s3 = '0.40';
        const s4 = '$4.00';
        const s5 = '4.0';
        const s6 = '.033';

        expect(priceValidator(num)).toEqual(false);
        expect(priceValidator(s)).toEqual(false);
        expect(priceValidator(s1)).toEqual(false);
        expect(priceValidator(s2)).toEqual(false);
        expect(priceValidator(s3)).toEqual(true);
        expect(priceValidator(s4)).toEqual(false);
        expect(priceValidator(s5)).toEqual(false);
        expect(priceValidator(s6)).toEqual(false);
    });
});
