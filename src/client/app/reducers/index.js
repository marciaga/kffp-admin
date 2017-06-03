/* TODO @ma - search is disabled until a new implementation can be solved */
// import searchReducer from './searchReducer';
import authReducer from './authReducer';
import playlistReducer from './playlistReducer';
import modalReducer from './modalReducer';
import modelReducer from './modelReducer';
import formReducer from './formReducer';
import showReducer from './showReducer';
import feedbackReducer from './feedbackReducer';
import nowPlayingReducer from './nowPlayingReducer';
import uiReducer from './uiReducer';

export default {
    // search: searchReducer,
    auth: authReducer,
    playlist: playlistReducer,
    modal: modalReducer,
    model: modelReducer,
    form: formReducer,
    show: showReducer,
    feedback: feedbackReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer
};
