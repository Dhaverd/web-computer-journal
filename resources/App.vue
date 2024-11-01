<template>
    <v-app>
        <v-sheet class="bg-gradient justify-center d-flex flex-column" style="height: 100%">
            <div v-if="!isWide" class="d-flex justify-end mr-10 mt-3">
                <v-btn
                    class="bg-grey-darken-3 d-flex justify-center"
                    size="large"
                    density="compact"
                    rounded="xl"
                    @click="openMenu"
                    icon
                >
                    <v-icon>
                        <svg class="ham hamRotate ham1" viewBox="0 0 100 100" onclick="this.classList.toggle('active')">
                            <path
                                class="line top"
                                d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                            <path
                                class="line middle"
                                d="m 30,50 h 40" />
                            <path
                                class="line bottom"
                                d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                        </svg>
                    </v-icon>
                </v-btn>
            </div>
            <v-sheet
                v-if="isWide || menuOpen"
                class="d-flex justify-space-between rounded-lg main-bg h-auto mr-10 ml-10 align-center"
                :class="menuOpen ? 'mt-2 mb-2 pa-2 flex-column' : 'mt-10 mb-3 pa-5'"
            >
                <div class="d-flex justify-center rounded-lg main-bg h-auto mr-10 ml-10">
                    <v-label class="text-h6 h-auto w-auto pa-2">Welcome {{ authenticated ? userStore.user['name'] : 'guest' }}!</v-label><br>
                </div>
                <div class="d-flex" :class="menuOpen ? 'justify-center' : 'justify-end'">
                    <p class="ml-3 mr-3" :class="menuOpen ? 'text-body-1' : 'text-h6'"><RouterLink to="/" class="nav-link text-decoration-none">Главная</RouterLink></p>
                    <p v-if="!authenticated" class="ml-3 mr-3" :class="menuOpen ? 'text-body-1' : 'text-h6'"><RouterLink to="/login" class="nav-link text-decoration-none">Войти</RouterLink></p>
                    <p v-if="!authenticated" class="ml-3 mr-3" :class="menuOpen ? 'text-body-1' : 'text-h6'"><RouterLink to="/register" class="nav-link text-decoration-none">Регистрация</RouterLink></p>
                    <p v-if="authenticated" class="ml-3 mr-3" :class="menuOpen ? 'text-body-1' : 'text-h6'"><a href="#" class="nav-link text-decoration-none" @click="logout">Выйти</a></p>
                </div>
            </v-sheet>
            <v-sheet class="rounded-lg main-bg h-100 mt-3 mr-10 ml-10 mb-10 pa-5">
                <RouterView v-slot="{ Component }">
                    <Component
                        :is="Component"
                        :is-wide="isWide"
                    />
                </RouterView>
            </v-sheet>
        </v-sheet>
    </v-app>
</template>

<script>
import {useUserStore} from "./store/auth.js";
import {watch} from "vue";


export default {
    name: "App",
    data: () => ({
        userStore: useUserStore(),
        windowHeight: document.documentElement.clientHeight,
        windowWidth: document.documentElement.clientWidth,
        isWide: window.innerWidth >= 460,
        menuOpen: false,
        authenticated: false
    }),
    methods: {
        logout() {
            this.userStore.logout();
            this.$router.push('/login');
        },
        resizeEventHandler(e) {
            this.windowHeight = document.documentElement.clientHeight;
            this.windowWidth = document.documentElement.clientWidth;
            this.isWide = this.windowWidth >= 460;
            if (this.isWide){
                this.menuOpen = false;
            }
        },
        openMenu(){
            this.menuOpen = !this.menuOpen;
        }
    },
    created() {
        window.addEventListener("resize", this.resizeEventHandler);
    },
    mounted() {
        this.resizeEventHandler();
        window.addEventListener("resize", this.resizeEventHandler, { passive: true });
        this.userStore.checkUser();
        watch(this.userStore, (newStore)=>{
            this.authenticated = newStore.user !== null && newStore.user !== undefined;
        });
    }
}
</script>

<style scoped>

</style>


