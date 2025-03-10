<script>
import { watch, ref } from 'vue';
import { useUserStore } from '../store/auth.js';
import {useComputersStore} from "../store/computers.js";
import CreateForm from './Computers/CreateForm.vue';
import EditForm from './Computers/EditForm.vue';
export default {
    name: "ComputersList",
    components: {CreateForm, EditForm},
    data() {
        return {
            userStore: useUserStore(),
            computersStore: useComputersStore(),
            computerList: [],
            createDialogShow: false,
            editDialogShow: false,
            deleteDialogShow: false,
            fetching: false,
            authenticated: false,
            editLoading: false,
            deleteLoading: false,
            computerToDeleteId: null,
            computerToEditId: ref(0)
        };
    },
    methods: {
        showCreateDialog(){
            this.createDialogShow = true;
        },
        hideCreateDialog(){
            this.createDialogShow = false;
        },
        showEditDialog(id){
            this.computerToEditId = id;
            this.editDialogShow = true;
        },
        hideEditDialog(){
            this.editDialogShow = false;
        },
        showDeleteDialog(id){
            this.deleteDialogShow = true;
            this.computerToDeleteId = id;
        },
        hideDeleteDialog(){
            this.deleteDialogShow = false;
        },
        deleteComputer(){
            this.deleteLoading = true;
            this.computersStore.delete(this.computerToDeleteId).then(()=>{
                this.deleteLoading = false;
            })
        }
    },
    mounted() {
        this.computerList = this.computersStore.computers;
        watch(this.userStore, (newStore)=>{
            this.fetching = true;
            this.authenticated = newStore.user !== null && newStore.user !== undefined;
            this.computersStore.setToken(this.userStore.token);
            if (this.userStore.user !== null){
                this.computersStore.getComputerList(this.userStore.user['id']).then(()=>{
                    this.computerList = this.computersStore.computers;
                    this.fetching = false;
                })
            }
        });
        watch(this.computersStore, (newStore)=>{
            this.fetching = true;
            this.computerList = this.computersStore.computers;
            this.fetching = false;
            this.hideDeleteDialog();
        })
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
                            <v-label class="cursor-pointer">RAM: {{ computer['ram'] }}</v-label>
                            <v-label class="cursor-pointer">Motherboard: {{ computer['motherboard'] }}</v-label>
                            <v-label class="cursor-pointer">GPU: {{ computer['gpu'] }}</v-label>
                            <v-label class="cursor-pointer">Дополнительная информация: {{ computer['additional_info'] }}</v-label>
                        </v-card-text>
                    </v-card>
                </router-link>
                <div @click="showEditDialog(computer['id'])" class="card-bg align-self-stretch pa-2 d-flex justify-center align-center rounded-sm cursor-pointer mr-2 ml-2">
                    <v-icon icon="mdi-pencil"></v-icon>
                </div>
                <div @click="showDeleteDialog(computer['id'])" class="card-bg align-self-stretch pa-2 d-flex justify-center align-center rounded-sm cursor-pointer mr-2 ml-2">
                    <v-icon icon="mdi-trash-can"></v-icon>
                </div>
            </div>
        </div>
        <div class="w-100 pa-5" v-if="!fetching">
            <v-btn class="w-100" color="#F0A068FF" @click="showCreateDialog" rounded="xs">
                <v-icon icon="mdi-plus-thick"></v-icon>
            </v-btn>
        </div>
    </div>
    <v-dialog v-model="createDialogShow">
        <CreateForm :dialogClose="hideCreateDialog" />
    </v-dialog>
    <v-dialog v-model="deleteDialogShow" class="w-33">
        <v-card class="main-bg">
            <v-card-text class="d-flex flex-column">
                <v-label class="w-100 text-h5">Вы уверены?</v-label>
                <v-label class="w-100">Это действие удалит компьютер и все действия связанные с ним</v-label>
                <div class="d-flex w-100 justify-center">
                    <v-btn color="#F0A068FF" class="ma-2" :loading="deleteLoading" @click="deleteComputer">Да</v-btn>
                    <v-btn color="#F0A068FF" class="ma-2" @click="hideDeleteDialog">Нет</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="editDialogShow">
        <EditForm :dialogClose="hideEditDialog" :computer_id="computerToEditId"/>
    </v-dialog>
</template>

<style scoped>
.card-bg {
    background-color: #272727 !important;
    color: white;
}
</style>
