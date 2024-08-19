<script>
import { useAuthStore } from '../store/auth.js';
export default {
    name: "Register",
    props: {
        isWide: Boolean
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async register() {
            const authStore = useAuthStore();
            await authStore.register({
                name: this.name,
                email: this.email,
                password: this.password,
            });
            this.$router.push('/');
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
                <v-text-field type="password" v-model="password" label="Пароль" class="flex-grow-0" required></v-text-field>
                <div class="d-flex justify-center" :class="isWide ? '' : 'flex-column align-center'">
                    <v-btn type="submit" color="#F0A068FF" class="ma-5" :class="isWide ? 'w-25' : 'w-100 text-body-1'" block>Зарегистрироваться</v-btn>
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
