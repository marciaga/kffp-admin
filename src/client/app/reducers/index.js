import searchReducer from './searchReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import playlistReducer from './playlistReducer';
import showsReducer from './showsReducer';
import modalReducer from './modalReducer';
import formReducer from './formReducer';

export default {
    search: searchReducer,
    auth: authReducer,
    users: usersReducer,
    playlist: playlistReducer,
    shows: showsReducer,
    modal: modalReducer,
    form: formReducer
};
