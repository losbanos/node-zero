window.onload = function () {
    // console.log('window on load');
    // for(let i = 2; i< 10; i++) {
    //     const loginValue = `cookie_name${i}=cookieNameValue_${i}`;
    //     const now = new Date();
    //     now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
    //     const expired = `expires=${now.toUTCString()}`;
    //     document.cookie = `${loginValue};${expired}`;
    // }

    // const loginValue = `MyName=TemooJin`;
    // const now = new Date();
    // now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
    // const expired = `expires=${now.toUTCString()}`;
    // document.cookie = `${loginValue};${expired}`;
    const nameValue = getCookieByKey('cookie_name811');
    console.log('nameValue = ', nameValue)

}

function getCookieByKey(cookieKey) {
    const cookieList = document.cookie.split(';').map(cookie => cookie.trim());
    console.log('on');
    for(const cookie of cookieList) {
        const [key, v] = cookie.split('=');
        if (key === cookieKey) {
            return v;
        }
    }
    return undefined;
}