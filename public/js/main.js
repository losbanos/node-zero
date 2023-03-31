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
    const isLogined = Boolean(getCookieByKey('isLogined'));
    const login = document.querySelector('#login');
    if (isLogined) {
        login.innerHTML = '로그아웃';

    } else {
        login.innerHTML = '로그인';
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
