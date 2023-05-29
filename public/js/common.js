import {createCookies, getCookieByKey, setCookie} from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    const isLogined = Boolean(getCookieByKey('isLogined'));
    const login = document.querySelector('#login');
    if (isLogined) {
        login.innerHTML = '로그아웃';

    } else {
        login.innerHTML = '로그인';
    }
});


