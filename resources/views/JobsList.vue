<script>
import {useUserStore} from "../store/auth.js";
import {useComputersStore} from "../store/computers.js";
import {ref, watch} from "vue";
import CreateJobForm from "./Jobs/CreateJobForm.vue";
import EditJobForm from "./Jobs/EditJobForm.vue";

export default {
    name: "JobsList",
    components: {EditJobForm, CreateJobForm},
    data() {
        return {
            userStore: useUserStore(),
            computersStore: useComputersStore(),
            computerId: null,
            fetching: false,
            authenticated: false,
            jobs: [],
            createDialogShow: false,
            editDialogShow: false,
            jobToEditId: ref(0),
            deleteDialogShow: false,
            deleteLoading: false,
            jobToDeleteId: ref(0)
        };
    },
    mounted() {
        this.computerId = this.$route.query.id;
        this.fetching = true;
        this.computersStore.getJobsByComputerId(this.computerId).then((response)=>{
            this.jobs = response;
            this.fetching = false;
        });
        watch(this.computersStore, (newStore)=>{
            this.fetching = true;
            newStore.getJobsByComputerId(this.computerId).then((response)=>{
                this.jobs = response;
                this.fetching = false;
            });
        })
    },
    methods: {
        updateJobList(){
            this.fetching = true;
            this.computersStore.getJobsByComputerId(this.computerId).then((response)=>{
                this.jobs = response;
                this.fetching = false;
            });
        },
        showCreateDialog(){
            this.createDialogShow = true;
        },
        closeCreateDialog(){
            this.createDialogShow = false;
            this.updateJobList();
        },
        showEditDialog(id){
            this.jobToEditId = id;
            this.editDialogShow = true;
        },
        closeEditDialog(){
            this.editDialogShow = false;
            this.updateJobList();
        },
        showDeleteDialog(id){
            this.jobToDeleteId = id;
            this.deleteDialogShow = true;
        },
        closeDeleteDialog(){
            this.deleteDialogShow = false;
            this.updateJobList();
        },
        deleteComputer(){
            this.deleteLoading = true;
            this.computersStore.deleteJob(this.jobToDeleteId).then((responce)=>{
                this.deleteLoading = false;
                if (responce){
                    this.closeDeleteDialog();
                } else {
                    alert('Произошла ошибка')
                }
            })
        }
    }
}
</script>

<template>
    <div>
        <router-link to="/">
            <v-btn color="#F0A068FF">Назад</v-btn>
        </router-link>
        <v-skeleton-loader v-if="fetching" color="grey-darken-3" class="w-100" type="card"/>
        <div v-if="!fetching" class="pt-3 pb-3">
            <div class="d-flex mb-2" v-for="job in jobs">
                <v-card class="card-bg text-decoration-none w-100">
                    <v-card-title>{{ job['description'] }}</v-card-title>
                    <v-card-text class="d-flex flex-column cursor-pointer">
                        <label>Статус: {{ job['status'] }}</label>
                    </v-card-text>
                </v-card>
                <div @click="showEditDialog(job['id'])" class="card-bg align-self-stretch pa-2 d-flex justify-center align-center rounded-sm cursor-pointer mr-2 ml-2">
                    <v-icon icon="mdi-pencil"></v-icon>
                </div>
                <div @click="showDeleteDialog(job['id'])" class="card-bg align-self-stretch pa-2 d-flex justify-center align-center rounded-sm cursor-pointer mr-2 ml-2">
                    <v-icon icon="mdi-trash-can"></v-icon>
                </div>
            </div>
            <div class="w-100 pa-5" v-if="!fetching">
                <v-btn class="w-100" color="#F0A068FF" @click="showCreateDialog" rounded="xs">
                    <v-icon icon="mdi-plus-thick"></v-icon>
                </v-btn>
            </div>
        </div>
        <v-dialog v-model="createDialogShow">
            <CreateJobForm :dialogClose="closeCreateDialog" :computerId="computerId"/>
        </v-dialog>
        <v-dialog v-model="editDialogShow">
            <EditJobForm :dialogClose="closeEditDialog" :computerId="computerId" :jobId="jobToEditId"/>
        </v-dialog>
        <v-dialog v-model="deleteDialogShow" class="w-33">
            <v-card class="main-bg">
                <v-card-text class="d-flex flex-column">
                    <v-label class="w-100 text-h5">Вы уверены?</v-label>
                    <v-label class="w-100">Это действие удалит запись</v-label>
                    <div class="d-flex w-100 justify-center">
                        <v-btn color="#F0A068FF" class="ma-2" :loading="deleteLoading" @click="deleteComputer">Да</v-btn>
                        <v-btn color="#F0A068FF" class="ma-2" @click="closeDeleteDialog">Нет</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.card-bg {
    background-color: #272727 !important;
    color: white;
}
</style>
