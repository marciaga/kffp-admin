import searchReducer from './searchReducer';
import authReducer from './authReducer';
import playlistReducer from './playlistReducer';
import modalReducer from './modalReducer';
import modelReducer from './modelReducer';
import formReducer from './formReducer';
import showReducer from './showReducer';
import feedbackReducer from './feedbackReducer';
import nowPlayingReducer from './nowPlayingReducer';
import uiReducer from './uiReducer';
import reportsReducer from './reportsReducer';
import volunteerReducer from './volunteerReducer';

export default {
    search: searchReducer,
    auth: authReducer,
    playlist: playlistReducer,
    modal: modalReducer,
    model: modelReducer,
    form: formReducer,
    show: showReducer,
    volunteer: volunteerReducer,
    reports: reportsReducer,
    feedback: feedbackReducer,
    nowPlaying: nowPlayingReducer,
    ui: uiReducer
};
