import axios from "axios";
const api = axios.create({      
    // baseURL: "https://server-patheya.onrender.com/auth",
    // baseURL: "http://localhost:5000/auth",
    baseURL: "https://pathey.onrender.com/auth",

});
export const googleAuth = (code) => api.get(`/google?code=${code}`);

