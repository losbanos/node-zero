// import axios from 'axios';

class Login {
    constructor() {
        this.init();
    }

    init() {
        window.onload = function () {
            const loginBtn = document.querySelector('#login-button');
            const formUserName = document.querySelector('#formUserName');
            const formUserPassword = document.querySelector('#formUserPassword');

            loginBtn.addEventListener('click', () => {
                const userName = formUserName.value;
                const userPassword = formUserPassword.value;

                axios.post('gologin', {
                    userName: userName,
                    userPassword: userPassword
                }, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then((res) => {
                    const {value} = res.data;
                    if (value) {
                        location.href='/';
                    }
                }).catch(e => {

                })
            })
        }
    }
}


export default new Login()