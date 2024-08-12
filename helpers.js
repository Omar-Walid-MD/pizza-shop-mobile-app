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

export function isMissingProfileInfo(user)
{
    if(user)
    {
        if(!(user.username && user.mobileNo && user.location)) return true;
    }
    return false;
}

export function capitalize(string)
{
    return string[0].toUpperCase() + string.slice(1);
}