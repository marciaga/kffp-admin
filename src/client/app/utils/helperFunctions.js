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
    track: ''
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

export {
    debounce,
    hoursToDateObj,
    sortObjectsByKey,
    getTokenFromLocalStorage,
    generateBlankSongData,
    cleanPathname,
    pathHasPlaylistId,
    removePlaylistIdFromPath,
    humanReadableTime
};
