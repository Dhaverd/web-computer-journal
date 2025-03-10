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

        async getById(id){
            if (this.token === null){
                this.checkToken();
            }
            let result = null;
            await axios.get(
                '/api/data/computers/byId',
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        token: this.token
                    },
                    params: {
                        id: id
                    }
                }
            ).then((response)=>{
                result = response.data;
            });
            return result;
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

        async getJobsByComputerId(computerId){
            if (this.token === null){
                this.checkToken();
            }
            let result = null;
            await axios.get(
                '/api/data/jobs/byComputer',
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        token: this.token
                    },
                    params: {
                        computer_id: computerId
                    }
                }
            ).then((response)=>{
                result = response.data;
            });
            return result;
        },

        async getJobsById(id){
            if (this.token === null){
                this.checkToken();
            }
            let result = null;
            await axios.get(
                '/api/data/jobs/byId',
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        token: this.token
                    },
                    params: {
                        id: id
                    }
                }
            ).then((response)=>{
                result = response.data;
            });
            return result;
        },

        async createJob(computerId, description, status){
            if (this.token === null){
                this.checkToken();
            }
            await axios.post('/api/data/jobs/create', {
                computer_id: computerId,
                description: description,
                status: status
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    token: this.token
                },
            }).then(()=>{
                return true;
            }).catch(()=>{
                return false;
            });
        },

        async updateJob(id, computerId, description, status){
            if (this.token === null){
                this.checkToken();
            }
            await axios.post('/api/data/jobs/save', {
                id: id,
                computer_id: computerId,
                description: description,
                status: status
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

        async deleteJob(id){
            if (this.token === null){
                this.checkToken();
            }
            let result = false;
            await axios.post('/api/data/jobs/delete', {
                id: id,
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    token: this.token
                },
            }).then(()=>{
                this.getComputerList(useUserStore().user['id']);
                result = true;
            }).catch(()=>{
                result = false;
            });
            return result;
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

        async update(id, name, cpu, ram, motherboard, gpu, additional_info){
            if (this.token === null){
                this.checkToken();
            }
            await axios.post('/api/data/computers/save', {
                id: id,
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
