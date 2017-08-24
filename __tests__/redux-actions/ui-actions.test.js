import { togglePlaylistDrawer } from '../../src/client/app/actions/uiActions';

describe('uiActions', () => {
    it('should return a type of TOGGLE_PLAYLIST_DATA', () => {
        const { type } = togglePlaylistDrawer();

        expect(type).toBe('TOGGLE_PLAYLIST_DRAWER');
    });

    it('should add passed val to data', () => {
        const { data } = togglePlaylistDrawer('test');

        expect(data.playlistDrawer).toBe('test');
    });
});

