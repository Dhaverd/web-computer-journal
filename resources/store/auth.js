import {defineStore} from 'pinia'
import axios from "axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: localStorage.getItem('auth_token') || null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('auth_token', token);
        },
        async checkUser() {
            await axios.get(
                '/api/auth/user',
                {
                    headers:
                        {
                            Authorization: `Bearer ${this.token}`,
                            token: this.token
                        }
                }
            ).then((res) => {
                this.setUser(res.data);
                return true;
            }).catch((error) => {
                this.nullifyUser();
                return false;
            })
        },
        async login(email, password, rememberMe) {
            let responce = false;
            await axios.post(
                '/api/auth/login',
                {
                    'email': email,
                    'password': password,
                    'remember_me': rememberMe
                }).then((res) => {
                this.setUser(res.data.user);
                this.setToken(res.data.accessToken);
                responce = true;
            }).catch((error) => {
                if (!error.response) {
                    responce = false;
                }
                responce = error.response.data.message;
            })
            return responce;
        },
        async registration(login, email, password, repeatPassword) {
            let responce = false;
            await axios.post(
                '/api/auth/register',
                {
                    'name': login,
                    'email': email,
                    'password': password,
                    'c_password': repeatPassword
                }).then((res) => {
                this.setUser(res.data.user);
                this.setToken(res.data.accessToken);
                responce = true;
            }).catch((error) => {
                if (!error.response) {
                    responce = false;
                }
                responce=  error.response.data.message;
            })
            return responce;
        },
        logout() {
            axios.get('/api/auth/logout',
                {
                    headers:
                        {
                            Authorization: `Bearer ${this.token}`,
                            token: this.token
                        }
                }
            );
            this.nullifyUser();
        },
        nullifyUser() {
            this.setUser(null);
            this.setToken(null);
        },
        async getUsername(id){
            let result = null;
            await axios.get('/api/wish/username',
                {
                    params:
                        {
                            user_id: id
                        }
                }
            ).then((res) => {
                result = res;
            });
            return result;
        }
    },
})
