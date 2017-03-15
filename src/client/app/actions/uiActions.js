import { TOGGLE_PLAYLIST_DRAWER } from '../constants';

const togglePlaylistDrawer = (val) => ({
    type: TOGGLE_PLAYLIST_DRAWER,
    data: {
        playlistDrawer: val
    }
});

export { togglePlaylistDrawer };
