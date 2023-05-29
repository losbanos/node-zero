/**
 *
 * @param {Array<any>}keyValuePair 쿠키 키와 값
 * @param {Object} options
 */
function setCookie(keyValuePair, options = {expireDay: 1, secure: ''}) {
    Object.entries(keyValuePair).map(([key, value]) => {
        const expireDay = options?.expireDay || 1;
        const domain = options.domain || window.location.hostname;
        const secure = options?.secure || '';
        const date = new Date();
        date.setTime(date.getTime() + (setExpireTime(expireDay)));
        console.log(`${key}=${value};expires=${date};domain=${domain};'${secure}'`);
        document.cookie = `${key}=${value};expires=${date};domain=${domain};${secure}`;
        return [key, value];
    });
}

/**
 *
 * @param {Array} cookieValues
 */
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
    return (day * 24) * 60 * 60 * 1000;
}

export {
    createCookies,
    setCookie,
    getCookieByKey, setExpireTime
};