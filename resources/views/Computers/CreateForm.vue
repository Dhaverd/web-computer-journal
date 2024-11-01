<script>
import { useComputersStore } from '../../store/computers';
import {rules} from '../../js/rules.js'

export default {
    name: "CreateForm",
    computed: {
        rules() {
            return rules
        }
    },
    props: {
        dialogClose: Function
    },
    data() {
        return {
            computerName: null,
            computerCpu: null,
            computerMotherboard: null,
            computerGpu: null,
            computerAdditional: null,
            loading: false,
            computersStore: useComputersStore()
        }
    },
    methods: {
        createComputer(){
            this.loading = true;
            if (!rules.notNull(this.computerName)){
                alert('Имя компьютера необходимо заполнить');
                this.loading = false;
                return;
            }
            this.computersStore.create(
                this.computerName,
                this.computerCpu,
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
        <v-card-title>Создание нового компьютера</v-card-title>
        <v-card-text>            
            <v-text-field :rules="[rules.notNull]" label="Название" v-model="computerName" placeholder="Мой компьютер"></v-text-field>
            <v-text-field label="CPU" v-model="computerCpu" placeholder="Intel Core i5-12400F"></v-text-field>
            <v-text-field label="Материнская плата" v-model="computerMotherboard" placeholder="Asus ROG B650"></v-text-field>
            <v-text-field label="Gpu" v-model="computerGpu" placeholder="Nvidia RTX 3060ti"></v-text-field>
            <v-textarea label="Дополнительная информация" v-model="computerAdditional"></v-textarea>
            <div class="d-flex justify-center">
                <v-btn :loading="loading" @click="createComputer">Создать</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
</style>