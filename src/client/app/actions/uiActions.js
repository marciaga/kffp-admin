import { TOGGLE_PLAYLIST_DRAWER } from '../constants';

const togglePlaylistDrawer = val => ({
    type: TOGGLE_PLAYLIST_DRAWER,
    data: {
        playlistDrawer: val
    }
});

const dummyAction = lint => console.log(lint);

export { togglePlaylistDrawer, dummyAction };
