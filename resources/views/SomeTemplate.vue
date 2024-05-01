<template>
    <v-card class="bg-gradient" style="height: 100%">
        <v-card-text class="d-flex justify-center align-center">
            <v-card class="align-center justify-center h-auto w-33">
                <v-card-title>{{ cardTitle }}</v-card-title>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "SomeTemplate",
    data: () => ({
        cardTitle: 'Hello world!',
    })
}
</script>


<style scoped>

.bg-gradient {
    background: linear-gradient(-45deg, #f103b0, #f0a068, #4fdbfeff);
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
    height: 100vh;
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
