// import axios from '/node_modules/axios'

class Login {
    constructor() {
        this.init();
    }

    init() {
        window.onload = function () {
            const loginBtn = document.querySelector('#login-button');
            const formUserName = document.querySelector('#formUserName');
            const formUserPassword = document.querySelector('#formUserPassword');

            function setLoginData(cookieValues) {
                for(const keyValue of cookieValues) {
                    Object.entries(keyValue).map(([key, value]) => {
                        const date = new Date();
                        date.setDate(date.getDate() + (24 * 60 * 60 * 1000));
                        document.cookie = `${key}=${value};expires=${date.toUTCString()}`;
                        return [key,value];
                    });
                }
            }

            loginBtn.addEventListener('click', () => {
                const userName = formUserName.value;
                const userPassword = formUserPassword.value;
                console.log('name = ', userName);
                console.log('password = ', userPassword);
                if (userName === 'tedjin' && userPassword === 'tedjinS30%^') {
                    setLoginData([{userName: userName},{userPassword: userPassword}, {isLogined: true}]);
                }
            })
        }
    }
}

export default new Login()