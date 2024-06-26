<script>
export default {
    name: "Register",
    props: {
        isWide: Boolean
    }
}
</script>

<template>
    <div class="w-100 h-100 d-flex justify-center">
        <div class="d-flex flex-column justify-center h-100" :class="isWide ? 'w-50' : 'w-75'">
            <v-label>Логин:</v-label>
            <v-text-field label="Логин" class="flex-grow-0"></v-text-field>
            <v-label>E-mail:</v-label>
            <v-text-field label="E-mail" class="flex-grow-0"></v-text-field>
            <v-label>Пароль:</v-label>
            <v-text-field label="Пароль" class="flex-grow-0"></v-text-field>
            <div class="d-flex justify-center" :class="isWide ? '' : 'flex-column align-center'">
                <v-btn color="#F0A068FF" class="ma-5" :class="isWide ? 'w-25' : 'w-100 text-body-1'">Зарегистрироваться</v-btn>
                <router-link to="/login" class="text-decoration-none link-no-color ma-5" :class="isWide ? 'w-25' : 'w-100'">
                    <v-btn color="#F0A068FF" :class="isWide ? 'w-100' : 'w-100 text-body-1'">Вход</v-btn>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
