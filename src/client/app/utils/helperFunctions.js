const debounce = (func, wait, immediate) => {
    let timeout;

    return function (...args) {
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

export { debounce, hoursToDateObj, sortObjectsByKey, getTokenFromLocalStorage };
