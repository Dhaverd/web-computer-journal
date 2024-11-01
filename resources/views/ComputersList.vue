<script>
import { watch } from 'vue';
import { useUserStore } from '../store/auth.js';
import {useComputersStore} from "../store/computers.js";
import {rules} from "../js/rules.js";
export default {
    name: "About",
    data() {
        return {
            userStore: useUserStore(),
            computersStore: useComputersStore(),
            computerList: [],
            createDialogShow: false,
            editDialogShow: false,
            fetching: false,
            authenticated: false,
            computerName: null,
            computerCpu: null,
            computerMotherboard: null,
            computerGpu: null,
            computerAdditional: null,
        };
    },
    methods: {
        showCreateDialog(){
            this.createDialogShow = true;
        },
        showEditDialog(){
            this.editDialogShow = true;
        }
    },
    mounted() {
        this.userStore.checkUser();
        watch(this.userStore, (newStore)=>{
            this.fetching = true;
            this.authenticated = newStore.user !== null && newStore.user !== undefined;
            this.computersStore.setToken(this.userStore.token);
            this.computersStore.getComputerList(this.userStore.user['id']).then(()=>{
                this.computerList = this.computersStore.computers;
                this.fetching = false;
            })
        });
    }
}
</script>

<template>
    <div class="d-flex flex-column justify-center w-100">
        <v-skeleton-loader v-if="fetching" color="grey-darken-3" class="w-100" type="card"/>
        <div v-if="!fetching" class="w-100 h-100">
            <div class="d-flex align-center justify-space-between w-100 h-100" v-for="computer in computerList">
                <router-link :to="`/jobs?id=${computer['id']}`" class="text-decoration-none w-100 mr-2" >
                    <v-card class="card-bg text-decoration-none cursor-pointer w-100">
                        <v-card-title>{{ computer['name'] }}</v-card-title>
                        <v-card-text class="d-flex flex-column cursor-pointer">
                            <v-label class="cursor-pointer">CPU: {{ computer['cpu'] }}</v-label>
                            <v-label class="cursor-pointer">Motherboard: {{ computer['motherboard'] }}</v-label>
                            <v-label class="cursor-pointer">GPU: {{ computer['gpu'] }}</v-label>
                            <v-label class="cursor-pointer">Дополнительная информация: {{ computer['additional_info'] }}</v-label>
                        </v-card-text>
                    </v-card>
                </router-link>
                <div @click="showEditDialog" class="card-bg align-self-stretch pa-2 d-flex justify-center align-center rounded-sm">
                    <v-icon icon="mdi-pencil"></v-icon>
                </div>
            </div>
        </div>
        <div class="w-100 pa-5" v-if="!fetching">
            <v-btn class="w-100" color="#F0A068FF" @click="showCreateDialog" rounded="xs">
                <v-icon icon="mdi-plus-thick"></v-icon>
            </v-btn>
        </div>
    </div>
    <v-dialog :model-value="createDialogShow">
        <v-card class="main-bg">
            <v-card-title>Создание нового компьютера</v-card-title>
            <v-card-text>
                <v-text-field label="Название" :model-value="computerName" placeholder="Мой компьютер"></v-text-field>
                <v-text-field label="CPU" :model-value="computerCpu" placeholder="Intel Core i5-12400F"></v-text-field>
                <v-text-field label="Материнская плата" :model-value="computerMotherboard" placeholder="Asus ROG B650"></v-text-field>
                <v-text-field label="Gpu" :model-value="computerGpu" placeholder="Nvidia RTX 3060ti"></v-text-field>
                <v-textarea label="Дополнительная информация" :model-value="computerAdditional"></v-textarea>
                <v-btn>Создать</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.card-bg {
    background-color: #272727 !important;
    color: white;
}
</style>
