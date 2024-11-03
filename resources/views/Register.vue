<script>
import { useUserStore } from '../store/auth.js';
export default {
    name: "Register",
    props: {
        isWide: Boolean
    },
    data() {
        return {
            userStore: useUserStore(),
            name: '',
            email: '',
            password: '',
            c_password: '',
            errorMessage: '',
            errorMessageContainerStyle: 'display: none;',
            showPassword: false,
            showRepeatPassword: false,
            loading: false

        };
    },
    methods: {
        async register() {
            this.loading = true;
            await this.userStore.registration(this.name, this.email, this.password, this.c_password).then((isRegistred)=>{
                this.loading = false;
                if (typeof isRegistred == "boolean") {
                    if (isRegistred){
                        this.errorMessage = '';
                        this.errorMessageContainerStyle = 'display: none;';
                        this.$router.push('/');
                    } else {
                        this.errorMessage = 'Registration error';
                        this.errorMessageContainerStyle = '';
                    }
                } else if (typeof isRegistred == "string") {
                    this.errorMessage = isRegistred;
                    this.errorMessageContainerStyle = '';
                }

            });
        },
    }
}
</script>

<template>
    <div class="w-100 h-100 d-flex justify-center">
        <div class="d-flex flex-column justify-center h-100" :class="isWide ? 'w-50' : 'w-75'">
            <v-form @submit.prevent="register">
                <v-label>Имя:</v-label>
                <v-text-field type="text" v-model="name" label="Имя" class="flex-grow-0" required></v-text-field>
                <v-label>E-mail:</v-label>
                <v-text-field type="email" v-model="email" label="E-mail" class="flex-grow-0" required></v-text-field>
                <v-label>Пароль:</v-label>
                <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="password"
                    label="Пароль"
                    class="flex-grow-0"
                    required></v-text-field>
                <v-text-field
                    :type="showRepeatPassword ? 'text' : 'password'"
                    :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showRepeatPassword = !showRepeatPassword"
                    v-model="c_password"
                    label="Повторите пароль"
                    class="flex-grow-0"
                    required></v-text-field>
                <v-label :style="errorMessageContainerStyle">{{ errorMessage }}</v-label>
                <div class="d-flex justify-center" :class="isWide ? '' : 'flex-column align-center'">
                    <v-btn type="submit" color="#F0A068FF" class="ma-5" :class="isWide ? 'w-25' : 'w-100 text-body-1'" :loading="loading">Зарегистрироваться</v-btn>
                    <router-link to="/login" class="text-decoration-none link-no-color ma-5" :class="isWide ? 'w-25' : 'w-100'">
                        <v-btn color="#F0A068FF" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Вход</v-btn>
                    </router-link>
                </div>
            </v-form>
        </div>
    </div>
</template>

<style scoped>

</style>
