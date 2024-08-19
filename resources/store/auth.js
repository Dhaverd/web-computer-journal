import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async login(credentials) {
            const response = await axios.post('/api/login', credentials);
            this.user = response.data.user;
            this.token = response.data.token;
            localStorage.setItem('token', response.data.token);
        },
        async register(credentials) {
            const response = await axios.post('/api/register', credentials);
            this.user = response.data.user;
            this.token = response.data.token;
            localStorage.setItem('token', response.data.token);
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});
