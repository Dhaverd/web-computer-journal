<script>
import { useAuthStore } from '../store/auth.js';
export default {
    name: "About",
    data() {
        return {
            username: 'guest'
        };
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
    <v-label class="text-h3">Welcome {{ user != null ? user.name : 'guest' }}!</v-label><br>
</template>

<style scoped>

</style>
