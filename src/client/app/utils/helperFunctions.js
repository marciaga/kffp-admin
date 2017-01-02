const debounce = (func, wait, immediate) => {
    let timeout;

    return function () {
        const args = arguments;
        const later = () => {
            timeout = null;

            if (!immediate) {
                func.apply(this, args);
            }
        };
        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(this, args);
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
export { debounce, hoursToDateObj };
