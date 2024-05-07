<template>
    <v-app>
        <v-sheet class="bg-gradient justify-center d-flex flex-column" style="height: 100%">
            <v-sheet class="rounded-lg main-bg h-auto mt-10 mr-10 ml-10 mb-3 pa-5">
                <p class="text-h3">Меню</p>
            </v-sheet>
            <v-sheet class="rounded-lg main-bg h-100 mt-3 mr-10 ml-10 mb-10 pa-5">
                <Login></Login>
            </v-sheet>
        </v-sheet>
    </v-app>
</template>

<script>
import Login from "./views/Login.vue";

export default {
    name: "App",
    components: {Login}
}
</script>

<style scoped>

.main-bg {
    background-color: #424242;
    color: #e0e0e0;
    text-decoration-color: #e0e0e0;
}

.bg-gradient {
    background: linear-gradient(-45deg, #f103b0, #f0a068, #4fdbfeff);
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
    height: 200vh;
}

@keyframes gradient {
    0% {
        background-position: 0 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}

</style>


