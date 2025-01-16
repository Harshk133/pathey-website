import axios from "axios";
const api = axios.create({      
    // baseURL: "http://localhost:5000/auth",
    baseURL: import.meta.env.VITE_APP_BACKEND_URL_AUTH,

});
export const googleAuth = (code) => api.get(`/google?code=${code}`);

