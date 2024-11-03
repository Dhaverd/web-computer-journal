<template>
    <div class="w-100 h-100 d-flex justify-center">
        <div class="d-flex flex-column justify-center h-100" :class="isWide ? 'w-50' : 'w-75'">
            <v-form @submit.prevent="login">
                <v-label>Логин:</v-label>
                <v-text-field type="email" v-model="email" label="E-mail" class="flex-grow-0" required></v-text-field>
                <v-label>Пароль:</v-label>
                <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    label="Пароль"
                    class="flex-grow-0"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required></v-text-field>
                <v-checkbox v-model="rememberMe" label="Запомнить меня"></v-checkbox>
                <div class="d-flex justify-center" :class="isWide ? '' : 'flex-column align-center'">
                        <v-btn type="submit" color="#F0A068FF" class="ma-5 flex-grow-0" :class="isWide ? 'w-25' : 'w-100 text-body-1'" :loading="loading">Войти</v-btn>
                    <router-link to="/register" class="text-decoration-none link-no-color ma-5" :class="isWide ? 'w-25' : 'w-100'">
                        <v-btn color="#F0A068FF" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Регистрация</v-btn>
                    </router-link>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../store/auth.js';
export default {
    name: "Login",
    props: {
        isWide: Boolean
    },
    data() {
        return {
            userStore: useUserStore(),
            email: '',
            password: '',
            rememberMe: false,
            loading: false,
            errorMessage: '',
            errorMessageContainerStyle: 'display: none;',
            showPassword: false
        };
    },
    methods: {
        async login() {
            this.loading = true;
            await this.userStore.login(this.email, this.password, this.rememberMe).then((isLogged)=>{
                this.loading = false;
                if (typeof isLogged == "boolean") {
                    if (isLogged){
                        this.errorMessage = '';
                        this.errorMessageContainerStyle = 'display: none;';
                        this.$router.push('/');
                    } else {
                        this.errorMessage = 'Authentication error';
                        this.errorMessageContainerStyle = '';
                    }
                } else if (typeof isLogged == "string") {
                    this.errorMessage = isLogged;
                    this.errorMessageContainerStyle = '';
                }
            });
            this.$router.push('/');
        },
    }
}
</script>


<style scoped>

</style>
