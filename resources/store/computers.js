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
            this.token = useUserStore().token;
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
        },
        async create(name, cpu, ram, motherboard, gpu, additional_info){
            if (this.token === null){
                this.checkToken();
            }
            await axios.post('/api/data/computers/create', {
                user_id: useUserStore().user['id'],
                name: name,
                cpu: cpu,
                ram: ram,
                motherboard: motherboard,
                gpu: gpu,
                additional_info: additional_info,
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    token: this.token
                },
            }).then(()=>{
                this.getComputerList(useUserStore().user['id']);
                return true;
            }).catch(()=>{
                return false;
            });
        },
        async delete(id){
            if (this.token === null){
                this.checkToken();
            }
            await axios.post('/api/data/computers/delete', {
                id: id,
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    token: this.token
                },
            }).then(()=>{
                this.getComputerList(useUserStore().user['id']);
                return true;
            }).catch(()=>{
                return false;
            });
        }
    },
})
