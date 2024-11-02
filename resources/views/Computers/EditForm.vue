<script>
import { useComputersStore } from '../../store/computers.js';
import {rules} from '../../js/rules.js';
import {toRef, ref} from "vue";

export default {
    name: "EditForm",
    computed: {
        rules() {
            return rules
        }
    },
    props: {
        dialogClose: Function,
        computer_id: Number
    },
    setup(props) {
        const id = toRef(props, 'computer_id')
    },
    mounted() {
        this.fetching = true;
        this.computersStore.getById(this.computer_id).then((response)=>{
            console.log(response);
            this.computerToEdit = response;
            this.computerName = this.computerToEdit['name'];
            this.computerCpu = this.computerToEdit['cpu'];
            this.computerRam = this.computerToEdit['ram'];
            this.computerMotherboard = this.computerToEdit['motherboard'];
            this.computerGpu = this.computerToEdit['gpu'];
            this.computerAdditional = this.computerToEdit['additional_info'];
            this.fetching = false;
        });
    },
    data() {
        return {
            computerToEdit: null,
            computerName: null,
            computerCpu: null,
            computerRam: null,
            computerMotherboard: null,
            computerGpu: null,
            computerAdditional: null,
            loading: false,
            fetching: false,
            computersStore: useComputersStore()
        }
    },
    methods: {
        editComputer(){
            this.loading = true;
            if (!rules.notNull(this.computer_id) || this.computer_id === 0){
                alert('Произошла ошибка');
                this.loading = false;
                return;
            }
            if (!rules.notNull(this.computerName)){
                alert('Имя компьютера необходимо заполнить');
                this.loading = false;
                return;
            }
            this.computersStore.update(
                this.computer_id,
                this.computerName,
                this.computerCpu,
                this.computerRam,
                this.computerMotherboard,
                this.computerGpu,
                this.computerAdditional
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
            <span>Создание нового компьютера</span>
            <v-icon @click="dialogClose" class="cursor-pointer" icon="mdi-close-thick"></v-icon>
        </v-card-title>
        <v-card-text>      
            <v-skeleton-loader color="grey-darken-4" type="card" v-if="fetching"></v-skeleton-loader>
            <div v-if="!fetching">
                <v-text-field :rules="[rules.notNull]" label="Название" v-model="computerName" placeholder="Мой компьютер"></v-text-field>
                <v-text-field label="CPU" v-model="computerCpu" placeholder="Intel Core i5-12400F"></v-text-field>
                <v-text-field label="Оперативная память" v-model="computerRam" placeholder="Kingston Fury 2x16GB DDR4"></v-text-field>
                <v-text-field label="Материнская плата" v-model="computerMotherboard" placeholder="Asus ROG B650"></v-text-field>
                <v-text-field label="Gpu" v-model="computerGpu" placeholder="Nvidia RTX 3060ti"></v-text-field>
                <v-textarea label="Дополнительная информация" v-model="computerAdditional"></v-textarea>
                <div class="d-flex justify-center">
                    <v-btn color="#F0A068FF" :loading="loading" @click="editComputer">Сохранить</v-btn>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>