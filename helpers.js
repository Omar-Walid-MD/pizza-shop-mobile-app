export function debounce(callback,delay=100)
{
    let timeout;
    return (...args) =>
    {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}