import './js/bootstrap';
import {createApp} from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import Login from "./views/Login.vue";
import ComputersList from "./views/ComputersList.vue";
import JobsList from "./views/JobsList.vue";
import Register from "./views/Register.vue";
import {createMemoryHistory, createRouter} from "vue-router";
import { createPinia } from 'pinia';

const pinia = createPinia();

const routes = [
    {path: '/', component: ComputersList, props: true},
    {path: '/login', component: Login, props: true},
    {path: '/register', component: Register, props: true},
    {path: '/jobs', component: JobsList, props: true},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const vuetify = createVuetify({
    components,
    directives
})

createApp(App).use(vuetify).use(router).use(pinia).mount("#app")
