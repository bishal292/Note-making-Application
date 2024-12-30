import axios from 'axios';

export const ApiClient = axios.create({
    baseURL: import.meta.env.VITE_HOST_URL,
    withCredentials:true
})