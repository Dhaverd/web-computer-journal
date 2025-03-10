<script>
import { useComputersStore } from '../../store/computers.js';
import {rules} from '../../js/rules.js';
import {toRef, ref} from "vue";

export default {
    name: "EditJobForm",
    computed: {
        rules() {
            return rules
        }
    },
    props: {
        dialogClose: Function,
        computerId: Number,
        jobId: Number
    },
    setup(props) {
        const id = toRef(props, 'computer_id')
    },
    mounted() {
        this.fetching = true;
        this.computersStore.getJobsById(this.jobId).then((responce)=>{
            this.jobToEdit = responce;
            console.log(this.jobToEdit)
            this.jobDescription = this.jobToEdit['description'];
            this.jobStatus = this.jobToEdit['status'];
            this.fetching = false;
        });
    },
    data() {
        return {
            jobToEdit: null,
            jobDescription: null,
            jobStatus: null,
            loading: false,
            fetching: false,
            computersStore: useComputersStore()
        }
    },
    methods: {
        editJob(){
            this.loading = true;
            if (!rules.notNull(this.computerId) || this.computerId === 0 || !rules.notNull(this.jobId) || this.jobId === 0){
                alert('Произошла ошибка');
                this.loading = false;
                return;
            }
            if (!rules.notNull(this.jobDescription) || !rules.notNull(this.jobStatus)){
                alert('Описание и статус необходимо заполнить');
                this.loading = false;
                return;
            }
            this.computersStore.updateJob(
                this.jobId,
                this.computerId,
                this.jobDescription,
                this.jobStatus
            ).then((result)=>{
                this.loading = false;
                this.dialogClose();
            });
        }
    }
}
</script>

<template>
    <v-card class="main-bg">
        <v-card-title class="d-flex justify-space-between">
            <span>Изменение записи</span>
            <v-icon @click="dialogClose" class="cursor-pointer" icon="mdi-close-thick"></v-icon>
        </v-card-title>
        <v-card-text>
            <v-skeleton-loader color="grey-darken-4" type="card" v-if="fetching"></v-skeleton-loader>
            <div v-if="!fetching">
                <v-textarea label="Описание" v-model="jobDescription" placeholder="Замена термопасты 02.03.2025"></v-textarea>
                <v-text-field label="Статус" v-model="jobStatus" placeholder="В работе"></v-text-field>
                <div class="d-flex justify-center">
                    <v-btn color="#F0A068FF" :loading="loading" @click="editJob">Сохранить</v-btn>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>
