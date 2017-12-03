import moment from 'moment';

const debounce = (func, wait, immediate) => {
    let timeout;

    return function debouncify (...args) {
        const params = args;
        const later = () => {
            timeout = null;

            if (!immediate) {
                func.apply(this, params);
            }
        };
        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(this, params);
        }
    };
};
// we're making the assumption that the user is in Pacific Time
const hoursToDateObj = (hours) => {
    if (typeof hours === 'undefined') {
        return new Date();
    }

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(0);

    return date;
};

const humanReadableTime = (hour) => {
    if (!Number.isInteger(hour)) {
        return '';
    }

    return moment(hour, 'HH').format('h:mm a');
};

const getTokenFromLocalStorage = () => (
    window.localStorage ? localStorage.getItem('idToken') : null
);

// sorts objects by object keys ; data is an object
const sortObjectsByKey = (data) => {
    if (!data) {
        return;
    }

    return Object.keys(data).sort().reduce((memo, key) => {
        memo[key] = data[key];
        return memo;
    }, {});
};

const generateBlankSongData = () => ({
    album: '',
    artist: '',
    images: [],
    releaseDate: '',
    title: ''
});
// returns slug from pathname
const cleanPathname = (pathname) => {
    const blacklist = ['edit']; // words you don't want to return
    const splitPath = pathname.split('/').filter(item => blacklist.indexOf(item) === -1);

    return splitPath.join('/');
};

const pathHasPlaylistId = path => path.split('/').length === 4;

const removePlaylistIdFromPath = (path) => {
    const pathParts = path.split('/');

    pathParts.pop();

    return pathParts.join('/');
};

const dateSortAsc = (ary) => {
    if (!ary.length) {
        return [];
    }

    return [...ary].sort((a, b) => new Date(a.playedAt) - new Date(b.playedAt));
};

const dateSortDesc = (ary) => {
    if (!ary.length) {
        return [];
    }

    return [...ary].sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt));
};

const playlistUpdateMessage = (messageKey) => {
    const userMessages = {
        playlistDate: 'The playlist date was updated',
        showId: 'This playlist has been reassigned to a different show',
        playlistAlreadyExists: 'That playlist already exists',
        playlistDeleteFail: 'Playlist delete failed',
        songUpdated: 'Song successfully updated',
        noChange: 'The document was unchanged',
        noSuccess: 'Update was not successful'
    };

    const noMatch = 'The playlist record has been updated';

    const userMessage = userMessages[messageKey] ? userMessages[messageKey] : noMatch;

    return userMessage;
};

const permissions = {
    reports: ['reports'],
    admin: [],
    dj: []
};

const scopeValidator = (user, key) => {
    const { scope } = user;

    if (!scope) {
        return false;
    }

    if (scope === 'admin') {
        return true;
    }

    const p = permissions[key];

    return p.some(f => f === scope);
};

const isValidEmail = s =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(s);

export {
    debounce,
    dateSortAsc,
    dateSortDesc,
    hoursToDateObj,
    sortObjectsByKey,
    getTokenFromLocalStorage,
    generateBlankSongData,
    cleanPathname,
    pathHasPlaylistId,
    removePlaylistIdFromPath,
    humanReadableTime,
    playlistUpdateMessage,
    scopeValidator,
    isValidEmail
};
