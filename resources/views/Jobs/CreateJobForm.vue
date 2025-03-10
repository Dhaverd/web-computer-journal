<script>
import { useComputersStore } from '../../store/computers';
import {rules} from '../../js/rules.js'

export default {
    name: "CreateJobForm",
    computed: {
        rules() {
            return rules
        }
    },
    props: {
        dialogClose: Function,
        computerId: Number
    },
    data() {
        return {
            jobDescription: null,
            jobStatus: null,
            loading: false,
            computersStore: useComputersStore()
        }
    },
    methods: {
        createJob(){
            this.loading = true;
            if (!rules.notNull(this.jobDescription) || !rules.notNull(this.jobStatus)){
                alert('Описание и статус необходимо заполнить');
                this.loading = false;
                return;
            }
            this.computersStore.createJob(
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
            <span>Новая запись</span>
            <v-icon @click="dialogClose" class="cursor-pointer" icon="mdi-close-thick"></v-icon>
        </v-card-title>
        <v-card-text>
            <v-textarea label="Описание" v-model="jobDescription" placeholder="Замена термопасты 02.03.2025"></v-textarea>
            <v-text-field label="Статус" v-model="jobStatus" placeholder="В работе"></v-text-field>
            <div class="d-flex justify-center">
                <v-btn color="#F0A068FF" :loading="loading" @click="createJob">Создать</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>
