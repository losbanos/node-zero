function setCookie(keyValuePair, expireDay = 1) {
    Object.entries(keyValuePair).map(([key, value]) => {
        const date = new Date();
        date.setTime(date.getTime() + (setExpireTime(expireDay)));
        document.cookie = `${key}=${value};expires=${date.toUTCString()}`;
        return [key, value];
    });
}
function createCookies(cookieValues) {
    if (Array.isArray(cookieValues)) {
        for (const keyValue of cookieValues) {
            setCookie(keyValue);
        }
    } else {
        setCookie(cookieValues);
    }
}
function getCookieByKey(cookieKey) {
    const cookieList = document.cookie.split(';').map(cookie => cookie.trim());
    for(const cookie of cookieList) {
        const [key, v] = cookie.split('=');
        if (key === cookieKey) {
            return v;
        }
    }
    return undefined;
}
function setExpireTime(day) {
    return (day * 24) * Math.pow(60, 2) * 1000;
}
export {
    createCookies,
    setCookie,
    getCookieByKey, setExpireTime
};