<script>
import { watch } from 'vue';
import { useUserStore } from '../store/auth.js';
import {useComputersStore} from "../store/computers.js";
import CreateForm from './Computers/CreateForm.vue';
export default {
    name: "About",
    components: {CreateForm},
    data() {
        return {
            userStore: useUserStore(),
            computersStore: useComputersStore(),
            computerList: [],
            createDialogShow: false,
            editDialogShow: false,
            fetching: false,
            authenticated: false,
            editLoading: false
        };
    },
    methods: {
        showCreateDialog(){
            this.createDialogShow = true;
        },
        hideCreateDialog(){
            this.createDialogShow = false;
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
            if (this.userStore.user['id']){
                this.computersStore.getComputerList(this.userStore.user['id']).then(()=>{
                    this.computerList = this.computersStore.computers;
                    this.fetching = false;
                })
            }
        });
    }
}
</script>

<template>
    <div class="d-flex flex-column justify-center w-100">
        <v-skeleton-loader v-if="fetching" color="grey-darken-3" class="w-100" type="card"/>
        <div v-if="!fetching" class="w-100 h-100">
            <div class="d-flex align-center justify-space-between w-100 h-100 pt-3 pb-3" v-for="computer in computerList">
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
        <CreateForm :dialogClose="hideCreateDialog" />
    </v-dialog>
</template>

<style scoped>
.card-bg {
    background-color: #272727 !important;
    color: white;
}
</style>
