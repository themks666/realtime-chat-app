import axios from "axios";

export const axisoInstance = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})