import axios from "axios";
const api = axios.create({      
    // baseURL: "https://server-patheya.onrender.com/auth",
    baseURL: "http://localhost:5000/auth",

});
export const googleAuth = (code) => api.get(`/google?code=${code}`);

