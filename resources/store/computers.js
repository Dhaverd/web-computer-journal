import {defineStore} from 'pinia'
import axios from "axios";
import {useUserStore} from "./auth.js";

export const useComputersStore = defineStore('computers', {
    state: () => ({
        computers: [],
        token: null,
    }),
    actions: {
        setToken(token) {
            this.token = token;
            localStorage.setItem('auth_token', token);
        },
        checkToken(){
            this.token = this.useUserStore().token;
        },
        async getComputerList(user_id){
            if (this.token === null){
                this.checkToken();
            }
            await axios.get(
                '/api/data/computers/byUser',
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        token: this.token
                    },
                    params: {
                        user_id: user_id
                    }
                }
            ).then((response)=>{
                this.computers = response.data;
            })
        }
    },
})
