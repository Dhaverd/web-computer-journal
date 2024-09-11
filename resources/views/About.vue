<script>
import { useAuthStore } from '../store/auth.js';
export default {
    name: "About",
    data() {
        return {
            username: 'guest'
        };
    },
    props: {
        isWide: Boolean
    },
    computed: {
        user() {
            const authStore = useAuthStore();
            return authStore.user;
        },
    },
    methods: {
        logout() {
            const authStore = useAuthStore();
            authStore.logout();
            this.username = 'guest';
            this.$router.push('/login');
        },
    }
}
</script>

<template>
    <div v-if="user == null" class="d-flex justify-center align-center h-100 flex-column w-100">
        <v-label class="text-h3 d-flex justify-center align-center" :class="isWide ? 'w-100' : 'w-10'">Welcome guest!</v-label><br>
        <div class="d-flex justify-center align-center ma-5 w-100">
            <router-link to="/register" class="ma-3 text-decoration-none link-no-color flex-grow-0 min-width-btn" :class="isWide ? 'w-10' : 'w-100'">
                <v-btn color="#F0A068FF" class="pa-3" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Регистрация</v-btn>
            </router-link>
            <router-link to="/login" class="ma-3 text-decoration-none link-no-color flex-grow-0 min-width-btn" :class="isWide ? 'w-10' : 'w-100'">
                <v-btn color="#F0A068FF" class="pa-3" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Вход</v-btn>
            </router-link>
        </div>
    </div>
    <div v-else class="d-flex justify-center align-center h-100 flex-column w-100">
        <v-label class="text-h3 d-flex justify-center align-center" :class="isWide ? 'w-100' : 'w-10'">Welcome {{ user.name }}!</v-label>
    </div>
</template>

<style scoped>
.w-10 {
    width: 10%;
}
</style>
