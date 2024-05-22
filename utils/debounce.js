let timeout;

export default (func, delay) => {
    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
        func();
    }, delay);
};