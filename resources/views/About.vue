<script>
import { watch } from 'vue';
import { useUserStore } from '../store/auth.js';
export default {
    name: "About",
    data() {
        return {
            userStore: useUserStore(),
            authenticated: false,
            username: 'guest'
        };
    },
    methods: {
        logout() {
            this.userStore.logout();
            this.$router.push('/login');
        },
        setStored(stored){
            this.userStored = stored;
        }
    },
    mounted() {
        this.userStore.checkUser();
        watch(this.userStore, (newStore)=>{
            this.authenticated = newStore.user !== null && newStore.user !== undefined;
        });
    }
}
</script>

<template>
    <div class="d-flex justify-center">
        <v-label class="text-h3 h-auto w-auto pa-2">Welcome {{ authenticated ? userStore.user['name'] : 'guest' }}!</v-label><br>
    </div>
</template>

<style scoped>

</style>
