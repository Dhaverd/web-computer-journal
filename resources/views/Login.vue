<template>
    <div class="w-100 h-100 d-flex justify-center">
        <div class="d-flex flex-column justify-center h-100" :class="isWide ? 'w-50' : 'w-75'">
            <v-form @submit.prevent="login">
                <v-label>Логин:</v-label>
                <v-text-field type="email" v-model="email" label="E-mail" class="flex-grow-0" required></v-text-field>
                <v-label>Пароль:</v-label>
                <v-text-field type="password" v-model="password" label="Пароль" class="flex-grow-0" required></v-text-field>
                <div class="d-flex justify-center" :class="isWide ? '' : 'flex-column align-center'">
                    <v-btn type="submit" color="#F0A068FF" class="ma-5 flex-grow-0" :class="isWide ? 'w-25' : 'w-100 text-body-1'" block>Войти</v-btn>
                    <router-link to="/register" class="text-decoration-none link-no-color ma-5" :class="isWide ? 'w-25' : 'w-100'">
                        <v-btn color="#F0A068FF" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Регистрация</v-btn>
                    </router-link>
                </div>
            </v-form>
            <!--
            <v-label>Логин:</v-label>
            <v-text-field label="Логин" class="flex-grow-0"></v-text-field>
            <v-label>Пароль:</v-label>
            <v-text-field label="Пароль" class="flex-grow-0"></v-text-field>
            <div class="d-flex justify-center" :class="isWide ? '' : 'flex-column align-center'">
                <v-btn color="#F0A068FF" class="ma-5" :class="isWide ? 'w-25' : 'w-100 text-body-1'">Войти</v-btn>
                <router-link to="/register" class="text-decoration-none link-no-color ma-5" :class="isWide ? 'w-25' : 'w-100'">
                    <v-btn color="#F0A068FF" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Регистрация</v-btn>
                </router-link>
            </div>-->
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '../store/auth.js';
export default {
    name: "Login",
    props: {
        isWide: Boolean
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            const authStore = useAuthStore();
            await authStore.login({
                email: this.email,
                password: this.password,
            });
            this.$router.push('/');
        },
    }
}
</script>


<style scoped>

</style>
