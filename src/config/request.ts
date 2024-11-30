import axios from "axios";
import { loadState } from "./storage";

const request = axios.create({ baseURL: import.meta.env.VITE_APP_URL })

request.interceptors.request.use(
    (config) => {
        const token = loadState("token")
        
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { request };