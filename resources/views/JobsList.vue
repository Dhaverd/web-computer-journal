<script>
import {useUserStore} from "../store/auth.js";
import {useComputersStore} from "../store/computers.js";

export default {
    name: "JobsList",
    data() {
        return {
            userStore: useUserStore(),
            computersStore: useComputersStore(),
            computerId: null,
            fetching: false,
            authenticated: false
        };
    },
    mounted() {
        this.computerId = this.$route.query.id;
    }
}
</script>

<template>
    <div>
        <router-link to="/">
            <v-btn color="#F0A068FF">Назад</v-btn>
        </router-link>
        <v-skeleton-loader v-if="fetching" color="grey-darken-3" class="w-100" type="card"/>
        <div v-if="!fetching">

        </div>
    </div>
</template>

<style scoped>

</style>
